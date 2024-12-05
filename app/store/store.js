import axios from "axios";
import { create } from "zustand";
import { useLogInStore } from "./loginstore";
import { btmClient } from "./pstore";

// https://goblue-back.onrender.com/api/v1
export const projClient = axios.create({
  baseURL: "http://localhost:8500/api/v1",
  timeout: 10000,
});
const postURL = "/project";

//#######################################################
//  graph sprint store and requests
//#######################################################
export const useSprintSchemaStore = create((set, get) => ({
  sprints: [],
  sprint: null,
  sprintrequirements: [],
  page: 1,
  size: 15,
  getsprints: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;

    const pdata = {
      query: `query sprints ($page: Int!, $size: Int!) {
          sprints (page: $page, size: $size) {
              id
              name
              description
          }
      }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        // console.log(response.data);
        set((state) => ({
          ...state,
          sprints: response?.data?.data?.sprints,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  getsprint: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  sprint(id: Int!) {
           id
           name
           description
           requirements
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          sprint: response?.data?.data?.sprint,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createsprint: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: `mutation createsprint ($input: CreateSprintInput!) {
          createsprint (input: $input) {
              id
              name
              description
          }
      }`,
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
        url: `${postURL}/${current_project?.id}`,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        set((state) => ({
          ...state,
          sprint: response?.data?.data?.sprint,
        }));
        get().getsprints();
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updatesprint: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: `mutation updatesprint ($input: UpdateSprintInput!) {
          updatesprint (input: $input) {
              id
              name
              description
          }
      }`,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        get().getsprints();
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deletesprint: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deletesprint(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        data: pdata,
      })
      .then(function (response) {
        console.log(response.data);
        get().getsprints();
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM

  getsprintrequirements: async (sprintId, requirementId, page, size) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {
            sprintrequirements( sprint_id: Int!,  requirement_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             requirements
            }
            }
          }`,
      variables: {
        sprint_id: sprintId,
        requirement_id: requirementId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          sprintrequirements: response?.data?.data?.requirement,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createsprintrequirements: async (sprintId, requirementId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createsprintrequirement(sprint_id: Int!, requirement_id: Int! ) {
	        }}
	    `,
      variables: {
        sprint_id: sprintId,
        requirement_id: requirementId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
  deletesprintrequirements: async (sprintId, requirementId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        deletesprintrequirement(sprint_id: Int!, requirement_id: Int! ) {
	        }}
	    `,
      variables: {
        sprint_id: sprintId,
        requirement_id: requirementId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
}));
//#######################################################
//  graph requirement store and requests
//#######################################################
export const useRequirementSchemaStore = create((set, get) => ({
  requirements: [],
  requirement: null,
  requirementtests: [],
  page: 1,
  size: 15,
  getrequirements: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query { requirements(page: Int!, size: Int!) {
             id
             name
             description
             sprintid
             tests

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          requirements: response?.data?.data?.requirements,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  getrequirement: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  requirement(id: Int!) {
           id
           name
           description
           sprintid
           tests
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          requirement: response?.data?.data?.requirement,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createrequirement: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createrequirement(input: CreateRequirementInput) {
	         id
	         name
	         description
	         sprintid
	         tests

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
        url: `${postURL}/${current_project?.id}`,
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
          requirement: response?.data?.data?.requirement,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updaterequirement: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          updaterequirement(input: UpdateRequirementInput) {
           id
           name
           description
           sprintid
           tests

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deleterequirement: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deleterequirement(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM

  getrequirementtests: async (requirementId, testId, page, size) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {
            requirementtests( requirement_id: Int!,  test_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             sprintid
             tests
            }
            }
          }`,
      variables: {
        requirement_id: requirementId,
        test_id: testId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          requirementtests: response?.data?.data?.test,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createrequirementtests: async (requirementId, testId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createrequirementtest(requirement_id: Int!, test_id: Int! ) {
	        }}
	    `,
      variables: {
        requirement_id: requirementId,
        test_id: testId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
  deleterequirementtests: async (requirementId, testId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        deleterequirementtest(requirement_id: Int!, test_id: Int! ) {
	        }}
	    `,
      variables: {
        requirement_id: requirementId,
        test_id: testId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
}));
//#######################################################
//  graph test store and requests
//#######################################################
export const useTestSchemaStore = create((set, get) => ({
  tests: [],
  test: null,
  page: 1,
  size: 15,
  gettests: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query { tests(page: Int!, size: Int!) {
             id
             name
             steps
             expectedresult
             requirementid

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          tests: response?.data?.data?.tests,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  gettest: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  test(id: Int!) {
           id
           name
           steps
           expectedresult
           requirementid
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          test: response?.data?.data?.test,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createtest: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createtest(input: CreateTestInput) {
	         id
	         name
	         steps
	         expectedresult
	         requirementid

	        }}
	    `,
      variables: {
        input: {
          name: data.name,
          steps: data.steps,
          expectedresult: data.expectedresult,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          test: response?.data?.data?.test,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updatetest: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          updatetest(input: UpdateTestInput) {
           id
           name
           steps
           expectedresult
           requirementid

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          steps: data.steps,
          expectedresult: data.expectedresult,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deletetest: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deletetest(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM
}));
//#######################################################
//  graph testset store and requests
//#######################################################
export const useTestsetSchemaStore = create((set, get) => ({
  testsets: [],
  testset: null,
  testsettests: [],
  page: 1,
  size: 15,
  gettestsets: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query { testsets(page: Int!, size: Int!) {
             id
             name
             description
             tests

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testsets: response?.data?.data?.testsets,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  gettestset: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  testset(id: Int!) {
           id
           name
           description
           tests
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testset: response?.data?.data?.testset,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createtestset: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createtestset(input: CreateTestsetInput) {
	         id
	         name
	         description
	         tests

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
        url: `${postURL}/${current_project?.id}`,
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
          testset: response?.data?.data?.testset,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updatetestset: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          updatetestset(input: UpdateTestsetInput) {
           id
           name
           description
           tests

          }}
      `,
      variables: {
        input: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deletetestset: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deletetestset(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM

  gettestsettests: async (testsetId, testId, page, size) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {
            testsettests( testset_id: Int!,  test_id: Int!, page: Int!, size: Int!) {
           	 id
             name
             description
             tests
            }
            }
          }`,
      variables: {
        testset_id: testsetId,
        test_id: testId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testsettests: response?.data?.data?.test,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createtestsettests: async (testsetId, testId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createtestsettest(testset_id: Int!, test_id: Int! ) {
	        }}
	    `,
      variables: {
        testset_id: testsetId,
        test_id: testId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
  deletetestsettests: async (testsetId, testId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        deletetestsettest(testset_id: Int!, test_id: Int! ) {
	        }}
	    `,
      variables: {
        testset_id: testsetId,
        test_id: testId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
}));
//#######################################################
//  graph testtestset store and requests
//#######################################################
export const useTestTestsetSchemaStore = create((set, get) => ({
  testtestsets: [],
  testtestset: null,
  testtestsetissues: [],
  page: 1,
  size: 15,
  gettesttestsets: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query { testtestsets(page: Int!, size: Int!) {
             id
             testid
             testsetid
             runstatus
             run
             sevierity
             issues

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testtestsets: response?.data?.data?.testtestsets,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  gettesttestset: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  testtestset(id: Int!) {
           id
           testid
           testsetid
           runstatus
           run
           sevierity
           issues
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testtestset: response?.data?.data?.testtestset,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createtesttestset: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createtesttestset(input: CreateTestTestsetInput) {
	         id
	         testid
	         testsetid
	         runstatus
	         run
	         sevierity
	         issues

	        }}
	    `,
      variables: {
        input: {
          runstatus: data.runstatus,
          run: data.run,
          sevierity: data.sevierity,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testtestset: response?.data?.data?.testtestset,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updatetesttestset: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          updatetesttestset(input: UpdateTestTestsetInput) {
           id
           testid
           testsetid
           runstatus
           run
           sevierity
           issues

          }}
      `,
      variables: {
        input: {
          id: data.id,
          runstatus: data.runstatus,
          run: data.run,
          sevierity: data.sevierity,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deletetesttestset: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deletetesttestset(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM

  gettesttestsetissues: async (testtestsetId, issueId, page, size) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {
            testtestsetissues( testtestset_id: Int!,  issue_id: Int!, page: Int!, size: Int!) {
           	 id
             testid
             testsetid
             runstatus
             run
             sevierity
             issues
            }
            }
          }`,
      variables: {
        testtestset_id: testtestsetId,
        issue_id: issueId,
        page: page,
        size: size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          testtestsetissues: response?.data?.data?.issue,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createtesttestsetissues: async (testtestsetId, issueId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createtesttestsetissue(testtestset_id: Int!, issue_id: Int! ) {
	        }}
	    `,
      variables: {
        testtestset_id: testtestsetId,
        issue_id: issueId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
  deletetesttestsetissues: async (testtestsetId, issueId) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        deletetesttestsetissue(testtestset_id: Int!, issue_id: Int! ) {
	        }}
	    `,
      variables: {
        testtestset_id: testtestsetId,
        issue_id: issueId,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
}));
//#######################################################
//  graph issue store and requests
//#######################################################
export const useIssueSchemaStore = create((set, get) => ({
  issues: [],
  issue: null,
  page: 1,
  size: 15,
  getissues: async () => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query { issues(page: Int!, size: Int!) {
             id
             issuename
             issuestatus
             issuedescription

        }`,
      variables: {
        page: get().page,
        size: get().size,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          issues: response?.data?.data?.issues,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  getissue: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` query {  issue(id: Int!) {
           id
           issuename
           issuestatus
           issuedescription
          }
        }`,
      variables: {
        id: id,
      },
    };
    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          issue: response?.data?.data?.issue,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  createissue: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
	        createissue(input: CreateIssueInput) {
	         id
	         issuename
	         issuestatus
	         issuedescription

	        }}
	    `,
      variables: {
        input: {
          issuename: data.issuename,
          issuestatus: data.issuestatus,
          issuedescription: data.issuedescription,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
          issue: response?.data?.data?.issue,
        }));
      })
      .catch((response, error) => {
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  updateissue: async (data) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          updateissue(input: UpdateIssueInput) {
           id
           issuename
           issuestatus
           issuedescription

          }}
      `,
      variables: {
        input: {
          id: data.id,
          issuename: data.issuename,
          issuestatus: data.issuestatus,
          issuedescription: data.issuedescription,
        },
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  deleteissue: async (id) => {
    let token = useLogInStore.getState().access_token;
    let current_project = useLogInStore.getState().current_project;
    const pdata = {
      query: ` mutation {
          deleteissue(id: Int!)
        }`,
      variables: {
        id: id,
      },
    };

    await btmClient
      .request({
        method: "POST",
        url: `${postURL}/${current_project?.id}`,
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
        const responseError = response?.data?.data?.details;
        console.log(responseError);
      });
  },
  // ######################################
  // relation OTM/MTM
}));
