import { projClient } from "./store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLogInStore = create(
  persist(
    (set, get) => ({
      blue_admin_token: false,
      access_token: "anonymous",
      refresh_token: null,
      roles: null,
      user: null,
      user_name: null,
      user_id: null,
      user_uuid: null,
      responseError: null,
      current_project: null,
      user_projects: [],
      setCurrentProject: (value) => {
        let cur_project = get().user_projects.filter(
          (dapp) => dapp.id == value,
        )[0];
        set((state) => ({
          ...state,
          current_project: cur_project,
        }));
      },
      setToken: async (data) => {
        set((state) => ({
          ...state,
          user_projects: data?.projects,
          current_project: data?.projects[0],
          blue_admin_token: data?.blue_admin_token,
          roles: data?.user?.roles,
          user_name: data?.user?.email,
          user_uuid: data?.user?.uuid,
          user_id: data?.user?.user_id,
          access_token: data?.access_token,
          refresh_token: data?.refresh_token,
          user: data?.user,
        }));
      },
      refToken: async () => {
        await projClient
          .request({
            method: "POST",
            url: "/login",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              grant_type: "refresh_token",
              email: "refresh@refresh.com",
              password: "refreshtoken",
              token: get().refresh_token,
            },
          })
          .then(function (response) {
            const access_token = response?.data?.login.access_token;
            const refresh_token = response?.data?.login.refresh_token;

            set((state) => ({
              ...state,
              access_token: access_token,
              refresh_token: refresh_token,
            }));
          })
          .catch((response, error) => {
            const responseError = response?.data?.details
              ? response?.data?.details
              : "Something Went Wrong, Try again";
          });
      },
      resetTokenLogout: () =>
        set({
          blue_admin_token: false,
          roles: null,
          user_name: null,
          user_id: null,
          access_token: null,
          refresh_token: null,
          responseError: null,
        }),
      getUserProjects: async () => {
        const pdata = {
          query: `query userprojects ($user_id: Int!) {
                      userprojects (user_id: $user_id) {
                          id
                          name
                          description
                          uuid
                      }
                  }`,
          variables: {
            user_id: get().user_id,
          },
        };

        await projClient
          .request({
            method: "POST",
            url: "/admin",
            headers: {
              "Content-Type": "application/json",
              "X-APP-TOKEN": get()?.access_token,
            },
            data: pdata,
          })
          .then(function (response) {
            set((state) => ({
              ...state,
              user_projects: response?.data?.data?.userprojects,
              current_project: response?.data?.data?.userprojects[0] || null,
            }));
          })
          .catch((response, error) => {
            const responseError = response?.data?.details;
            console.log(responseError);
          });
        // console.log(get().current_project);
      },
    }),
    {
      name: "login-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
