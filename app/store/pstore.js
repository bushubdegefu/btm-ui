import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useLogInStore } from "./loginstore";

// https://goblue-back.onrender.com/api/v1
export const btmClient = axios.create({
  baseURL: "http://localhost:8500/api/v1",
  timeout: 10000,
});
const postURL = "/admin";

//#######################################################
//  graph role store and requests
//#######################################################
export const useRoleSchemaStore = create((set, get) => ({
  roles: [],
  role: null,
  roleusers: [],
  rolefeatures: [],
  page: 1,
  size: 15,
  getroles: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { roles(page: Int!, size: Int!) {
             id
             name
             description
             active
             users
             features
             pages
             appid

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          roles: response?.data?.roles,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getrole: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  role(id: Int!) {
           id
           name
           description
           active
           users
           features
           pages
           appid
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          role: response?.data?.role,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createrole: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createrole(input: CreateRoleInput) {
	         id
	         name
	         description
	         active
	         users
	         features
	         pages
	         appid

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          role: response?.data?.role,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updaterole: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updaterole(input: UpdateRoleInput) {
           id
           name
           description
           active
           users
           features
           pages
           appid

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          description: data.description,
          active: data.active,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deleterole: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deleterole(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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

  getroleusers: async (roleId, userId, page, size) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {
            roleusers( role_id: Int!,  user_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             active
             users
             features
             pages
             appid
            }
            }
          }`,
      variables: {
        role_id: roleId,
        user_id: userId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          roleusers: response?.data?.user,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createroleusers: async (roleId, userId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createroleuser(role_id: Int!, user_id: Int! ) {
	        }}
	    `,
      variables: {
        role_id: roleId,
        user_id: userId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
        const responseError = response?.data;
        console.log(responseError);
      });
  },
  deleteroleusers: async (roleId, userId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        deleteroleuser(role_id: Int!, user_id: Int! ) {
	        }}
	    `,
      variables: {
        role_id: roleId,
        user_id: userId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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

  getrolefeatures: async (roleId, featureId, page, size) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {
            rolefeatures( role_id: Int!,  feature_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             active
             users
             features
             pages
             appid
            }
            }
          }`,
      variables: {
        role_id: roleId,
        feature_id: featureId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          rolefeatures: response?.data?.feature,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createrolefeatures: async (roleId, featureId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createrolefeature(role_id: Int!, feature_id: Int! ) {
	        }}
	    `,
      variables: {
        role_id: roleId,
        feature_id: featureId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
        const responseError = response?.data;
        console.log(responseError);
      });
  },
  deleterolefeatures: async (roleId, featureId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        deleterolefeature(role_id: Int!, feature_id: Int! ) {
	        }}
	    `,
      variables: {
        role_id: roleId,
        feature_id: featureId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
}));
//#######################################################
//  graph app store and requests
//#######################################################
export const useAppSchemaStore = create((set, get) => ({
  apps: [],
  app: null,
  approles: [],
  page: 1,
  size: 15,
  getapps: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { apps(page: Int!, size: Int!) {
             id
             name
             uuid
             active
             description
             roles

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          apps: response?.data?.apps,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getapp: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  app(id: Int!) {
           id
           name
           uuid
           active
           description
           roles
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          app: response?.data?.app,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createapp: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createapp(input: CreateAppInput) {
	         id
	         name
	         uuid
	         active
	         description
	         roles

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          app: response?.data?.app,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updateapp: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updateapp(input: UpdateAppInput) {
           id
           name
           uuid
           active
           description
           roles

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          active: data.active,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deleteapp: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deleteapp(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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

  getapproles: async (appId, roleId, page, size) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {
            approles( app_id: Int!,  role_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             uuid
             active
             description
             roles
            }
            }
          }`,
      variables: {
        app_id: appId,
        role_id: roleId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          approles: response?.data?.role,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createapproles: async (appId, roleId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createapprole(app_id: Int!, role_id: Int! ) {
	        }}
	    `,
      variables: {
        app_id: appId,
        role_id: roleId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
        const responseError = response?.data;
        console.log(responseError);
      });
  },
  deleteapproles: async (appId, roleId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        deleteapprole(app_id: Int!, role_id: Int! ) {
	        }}
	    `,
      variables: {
        app_id: appId,
        role_id: roleId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
}));
//#######################################################
//  graph user store and requests
//#######################################################
export const useUserSchemaStore = create((set, get) => ({
  users: [],
  user: null,
  userroles: [],
  page: 1,
  size: 15,
  getusers: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { users(page: Int!, size: Int!) {
             id
             email
             password
             dateregistred
             disabled
             uuid
             roles

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          users: response?.data?.users,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getuser: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  user(id: Int!) {
           id
           email
           password
           dateregistred
           disabled
           uuid
           roles
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          user: response?.data?.user,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createuser: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createuser(input: CreateUserInput) {
	         id
	         email
	         password
	         dateregistred
	         disabled
	         uuid
	         roles

	        }}
	    `,
      variables: {
        input: {
          email: data.email,
          dateregistred: data.dateregistred,
          disabled: data.disabled,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          user: response?.data?.user,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updateuser: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updateuser(input: UpdateUserInput) {
           id
           email
           password
           dateregistred
           disabled
           uuid
           roles

          }}
      `,
      variables: {
        input: {
          email: data.email,
          password: data.password,
          dateregistred: data.dateregistred,
          disabled: data.disabled,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deleteuser: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deleteuser(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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

  getuserroles: async (userId, roleId, page, size) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {
            userroles( user_id: Int!,  role_id: Int!, page: Int!, size: Int!) {
           	 id
             email
             password
             dateregistred
             disabled
             uuid
             roles
            }
            }
          }`,
      variables: {
        user_id: userId,
        role_id: roleId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          userroles: response?.data?.role,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createuserroles: async (userId, roleId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createuserrole(user_id: Int!, role_id: Int! ) {
	        }}
	    `,
      variables: {
        user_id: userId,
        role_id: roleId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
        const responseError = response?.data;
        console.log(responseError);
      });
  },
  deleteuserroles: async (userId, roleId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        deleteuserrole(user_id: Int!, role_id: Int! ) {
	        }}
	    `,
      variables: {
        user_id: userId,
        role_id: roleId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
}));
//#######################################################
//  graph feature store and requests
//#######################################################
export const useFeatureSchemaStore = create((set, get) => ({
  features: [],
  feature: null,
  featureendpoints: [],
  page: 1,
  size: 15,
  getfeatures: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { features(page: Int!, size: Int!) {
             id
             name
             description
             active
             roleid
             endpoints

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          features: response?.data?.features,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getfeature: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  feature(id: Int!) {
           id
           name
           description
           active
           roleid
           endpoints
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          feature: response?.data?.feature,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createfeature: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createfeature(input: CreateFeatureInput) {
	         id
	         name
	         description
	         active
	         roleid
	         endpoints

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          description: data.description,
          active: data.active,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          feature: response?.data?.feature,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updatefeature: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updatefeature(input: UpdateFeatureInput) {
           id
           name
           description
           active
           roleid
           endpoints

          }}
      `,
      variables: {
        input: {
          name: data.name,
          description: data.description,
          active: data.active,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deletefeature: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deletefeature(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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

  getfeatureendpoints: async (featureId, endpointId, page, size) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {
            featureendpoints( feature_id: Int!,  endpoint_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             active
             roleid
             endpoints
            }
            }
          }`,
      variables: {
        feature_id: featureId,
        endpoint_id: endpointId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          featureendpoints: response?.data?.endpoint,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createfeatureendpoints: async (featureId, endpointId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createfeatureendpoint(feature_id: Int!, endpoint_id: Int! ) {
	        }}
	    `,
      variables: {
        feature_id: featureId,
        endpoint_id: endpointId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
        const responseError = response?.data;
        console.log(responseError);
      });
  },
  deletefeatureendpoints: async (featureId, endpointId) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        deletefeatureendpoint(feature_id: Int!, endpoint_id: Int! ) {
	        }}
	    `,
      variables: {
        feature_id: featureId,
        endpoint_id: endpointId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
}));
//#######################################################
//  graph endpoint store and requests
//#######################################################
export const useEndpointSchemaStore = create((set, get) => ({
  endpoints: [],
  endpoint: null,
  page: 1,
  size: 15,
  getendpoints: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { endpoints(page: Int!, size: Int!) {
             id
             name
             routepath
             method
             description
             featureid

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          endpoints: response?.data?.endpoints,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getendpoint: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  endpoint(id: Int!) {
           id
           name
           routepath
           method
           description
           featureid
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          endpoint: response?.data?.endpoint,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createendpoint: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createendpoint(input: CreateEndpointInput) {
	         id
	         name
	         routepath
	         method
	         description
	         featureid

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          routepath: data.routepath,
          method: data.method,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          endpoint: response?.data?.endpoint,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updateendpoint: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updateendpoint(input: UpdateEndpointInput) {
           id
           name
           routepath
           method
           description
           featureid

          }}
      `,
      variables: {
        input: {
          name: data.name,
          routepath: data.routepath,
          method: data.method,
          description: data.description,
          featureid: data.featureid,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deleteendpoint: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deleteendpoint(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
//  graph page store and requests
//#######################################################
export const usePageSchemaStore = create((set, get) => ({
  pages: [],
  page: null,
  page: 1,
  size: 15,
  getpages: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { pages(page: Int!, size: Int!) {
             id
             name
             active
             description
             roles

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          pages: response?.data?.pages,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getpage: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  page(id: Int!) {
           id
           name
           active
           description
           roles
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          page: response?.data?.page,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  createpage: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
	        createpage(input: CreatePageInput) {
	         id
	         name
	         active
	         description
	         roles

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          page: response?.data?.page,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  updatepage: async (data) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          updatepage(input: UpdatePageInput) {
           id
           name
           active
           description
           roles

          }}
      `,
      variables: {
        input: {
          name: data.name,
          active: data.active,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
  deletepage: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      mutation: ` mutation {
          deletepage(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
//  graph jwtsalt store and requests
//#######################################################
export const useJWTSaltSchemaStore = create((set, get) => ({
  jwtsalts: [],
  jwtsalt: null,
  page: 1,
  size: 15,
  getjwtsalts: async () => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query { jwtsalts(page: Int!, size: Int!) {
             id
             salta
             saltb

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          jwtsalts: response?.data?.jwtsalts,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
  getjwtsalt: async (id) => {
    let token = useLogInStore.getState().access_token;
    const pdata = {
      query: ` query {  jwtsalt(id: Int!) {
           id
           salta
           saltb
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: postURL,
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
          jwtsalt: response?.data?.jwtsalt,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.details;
        console.log(responseError);
      });
  },
 
  // ######################################
  // relation OTM/MTM
}));
