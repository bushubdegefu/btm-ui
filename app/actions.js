"use server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Projector } from "lucide-react";
import { cookies } from "next/headers";
// import jsCookie from "js-cookie";

const postURL = "project";
const BaseURL = "http://localhost:8500/api/v1";

//#######################################################
//  logging in App
//#######################################################
export async function loggin(data) {
  try {
    const response = await axios.post(
      `${BaseURL}/login`,
      data, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": "login",
        },
        timeout: 10000,
      },
    );

    if (!response.status) {
      // console.log("####################### response error server###########");
      // console.log(response?.status);
      // console.log("####################### response error server###########");
      throw new Error("Failed to login");
    }

    // console.log(response?.data);
    // Parse the JSON response
    const responseData = response?.data;
    const access_token = responseData?.data?.AccessToken;
    const refresh_token = responseData?.data?.RefreshToken;
    const projects = await getUserProjectsAction({
      blue_admin_token: true,
      access_token,
      refresh_token,
    });
    if (access_token) {
      const user = jwtDecode(access_token); // Decode the JWT token
      const projects = await getUserProjectsAction({
        blue_admin_token: true,
        access_token,
        refresh_token,
        user,
      });

      return {
        blue_admin_token: true,
        access_token,
        refresh_token,
        user,
        projects: projects || [],
      };
    }

    // Handle missing access token if necessary
    throw new Error("Access token not found");
  } catch (error) {
    console.error("Error:", error.message);
    return null; // or you can handle the error in some other way
  }
}

export async function getUserProjectsAction(data) {
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
      user_id: data?.user?.user_id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": data?.access_token,
        },
        timeout: 10000,
      },
    );
    // console.log(response?.data?.data?.userprojects);
    return response?.data?.data?.userprojects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Getting User Projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
//#######################################################
//  graph sprint  requests
//#######################################################

export async function get_sprints() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query sprints ($page: Int!, $size: Int!) {
        sprints (page: $page, size: $size) {
            id
            name
            description
        }
    }`,
    variables: {
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      // `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
        timeout: 10000,
      },
    );

    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_sprint(id) {
  const cookieStore = cookies();
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `query sprint ($id: Int!) {
        sprint (id: $id) {
            id
            name
            description
        }
    }`,
    variables: {
      id: id,
    },
  };
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );
    // If the response is successful, return the sprints data

    return response?.data?.data?.sprint || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [];
    }

    // If no specific error details, return a generic message
    return [];
  }
}

export async function create_sprint(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_sprint(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_sprint(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deletesprint ($id: Int!) {
        deletesprint (id: $id)
    }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

// ######################################
// relation OTM/MTM

export async function get_sprintrequirements(sprintId, requirementId) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query sprintrequirements ($requirement_id: Int!, $sprint_id: Int!, $page: Int!, $size: Int!) {
        sprintrequirements (requirement_id: $requirement_id, sprint_id: $sprint_id, page: $page, size: $size) {
            id
            name
            description
            sprint_id
        }
    }`,
    variables: {
      sprint_id: sprintId,
      requirement_id: requirementId,
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_sprintrequirements(sprintId, requirementId) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createrequirementsprint ($requirement_id: Int!, $sprint_id: Int!) {
        createrequirementsprint (requirement_id: $requirement_id, sprint_id: $sprint_id) {
            id
            name
            description
            sprint_id
        }
    }`,
    variables: {
      sprint_id: sprintId,
      requirement_id: requirementId,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_sprintrequirements(sprintId, requirementId) {
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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph requirement  requests
//#######################################################

export async function get_requirements() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: ` query { requirements(page: Int!, size: Int!) {
             id
             name
             description
             sprintid
             tests

        }`,
    variables: {
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_requirement(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_requirement(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_requirement(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_requirement(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
          deleterequirement(id: Int!)
        }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

// ######################################
// relation OTM/MTM

export async function get_requirementtests(requirementId, testId, page, size) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
      page,
      size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_requirementtests(requirementId, testId) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_requirementtests(requirementId, testId) {
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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph test  requests
//#######################################################

export async function get_tests() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: ` query { tests(page: Int!, size: Int!) {
             id
             name
             steps
             expectedresult
             requirementid

        }`,
    variables: {
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_test(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_test(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_test(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_test(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
          deletetest(id: Int!)
        }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

// ######################################
// relation OTM/MTM

//#######################################################
//  graph testset  requests
//#######################################################

export async function get_testsets() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: ` query { testsets(page: Int!, size: Int!) {
             id
             name
             description
             tests

        }`,
    variables: {
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testset(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testset(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_testset(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testset(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
          deletetestset(id: Int!)
        }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

// ######################################
// relation OTM/MTM

export async function get_testsettests(testsetId, testId, page, size) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
      page,
      size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testsettests(testsetId, testId) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testsettests(testsetId, testId) {
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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph testtestset  requests
//#######################################################

export async function get_testtestsets() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
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
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testtestset(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testtestset(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_testtestset(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testtestset(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
          deletetesttestset(id: Int!)
        }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

// ######################################
// relation OTM/MTM

export async function get_testtestsetissues(
  testtestsetId,
  issueId,
  page,
  size,
) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
      page,
      size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testtestsetissues(testtestsetId, issueId) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testtestsetissues(testtestsetId, issueId) {
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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph issue  requests
//#######################################################

export async function get_issues() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: ` query { issues(page: Int!, size: Int!) {
             id
             issuename
             issuestatus
             issuedescription

        }`,
    variables: {
      page: current_page,
      size: page_size,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_issue(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_issue(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_issue(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

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

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_issue(id) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
          deleteissue(id: Int!)
        }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      },
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.sprints || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
