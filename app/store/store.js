import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// https://goblue-back.onrender.com/api/v1
export const projClient = axios.create({
  baseURL: "http://localhost:8500/api/v1",
  timeout: 10000,
});
const projURL = "/admin";

//#######################################################
//  graph project store and requests
//#######################################################
export const useProjectSchemaStore = create((set, get) => ({
  projects: [],
  project: null,
  page: 1,
  size: 15,
  getprojects: async () => {
    const pdata = {
      query: ` query { projects(page: Int!, size: Int!) {
             id
             name
             databasename
             description

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          projects: response?.data?.projects,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getproject: async (id) => {
    const pdata = {
      query: ` query {  project(id: Int!) {
           id
           name
           databasename
           description
          }
        }`,
      variables: {
        id: id,
      },
    };
    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          project: response?.data?.project,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createproject: async (data) => {
    const pdata = {
      mutation: ` mutation {
	        createproject(input: CreateProjectInput) {
	         id
	         name
	         databasename
	         description

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          databasename: data.databasename,
          description: data.description,
        },
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          project: response?.data?.project,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updateproject: async (data) => {
    const pdata = {
      mutation: ` mutation {
          updateproject(input: UpdateProjectInput) {
           id
           name
           databasename
           description

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          databasename: data.databasename,
          description: data.description,
        },
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  deleteproject: async (id) => {
    const pdata = {
      mutation: ` mutation {
          deleteproject(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM
}));
//#######################################################
//  graph projectusers store and requests
//#######################################################
export const useProjectUsersSchemaStore = create((set, get) => ({
  projectuserss: [],
  projectusers: null,
  page: 1,
  size: 15,
  getprojectuserss: async () => {
    const pdata = {
      query: ` query { projectuserss(page: Int!, size: Int!) {
             id
             useruuid
             projectid

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          projectuserss: response?.data?.projectuserss,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getprojectusers: async (id) => {
    const pdata = {
      query: ` query {  projectusers(id: Int!) {
           id
           useruuid
           projectid
          }
        }`,
      variables: {
        id: id,
      },
    };
    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          projectusers: response?.data?.projectusers,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createprojectusers: async (data) => {
    const pdata = {
      mutation: ` mutation {
	        createprojectusers(input: CreateProjectUsersInput) {
	         id
	         useruuid
	         projectid

	        }}
	    `,
      variables: {
        input: {
          useruuid: data.useruuid,
          projectid: data.projectid,
        },
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        set((state) => ({
          ...state,
          projectusers: response?.data?.projectusers,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updateprojectusers: async (data) => {
    const pdata = {
      mutation: ` mutation {
          updateprojectusers(input: UpdateProjectUsersInput) {
           id
           useruuid
           projectid

          }}
      `,
      variables: {
        input: {
          id: data.id,
          useruuid: data.useruuid,
          projectid: data.projectid,
        },
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  deleteprojectusers: async (id) => {
    const pdata = {
      mutation: ` mutation {
          deleteprojectusers(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await projClient
      .request({
        method: "POST",
        url: projURL,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM
}));
