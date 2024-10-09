import { projClient } from "./store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export const useLogInStore = create(
  persist(
    (set, get) => ({
      blue_admin_token: false,
      access_token: "anonymous",
      refresh_token: null,
      roles: null,
      user_name: null,
      user_id: null,
      responseError: null,
      current_project: null,
      setToken: async (data) => {
        const pdata = {
          query: `query login ($email: String!, $password: String!) {
                login (email: $email, password: $password) {
                    AccessToken
                    RefreshToken
                }
            }`,
          variables: data,
        };
        await projClient
          .request({
            method: "POST",
            url: "/admin",
            headers: {
              "Content-Type": "application/json",
              "X-APP-TOKEN": "login",
            },
            data: pdata,
          })
          .then(function (response) {
            console.log(response.data);
            const access_token = response?.data?.login.access_token;
            const refresh_token = response?.data?.login.refresh_token;
            const user = jwtDecode(access_token);

            set((state) => ({
              ...state,
              blue_admin_token: true,
              roles: user?.roles,
              user_name: user?.email,
              user_id: user?.uuid,
              access_token: access_token,
              refresh_token: refresh_token,
            }));
          })
          .catch((response, error) => {
            const responseError = response?.data?.details;
            console.log(responseError);
          });
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
    }),
    {
      name: "login-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
