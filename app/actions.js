"use server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
      }
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query sprints ($page: Int!, $size: Int!) {
      sprints (page: $page, size: $size) {
            total
            sprints {
                id
                name
                description
                status
                start_date
                duration
                }
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
      pdata, // Ensure pdata is correctly structured
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    return response?.data?.data?.sprints || {};
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function get_sprint(id) {
  const cookieStore = await cookies();
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `query sprint ($id: Int!) {
        sprint (id: $id) {
            id
            name
            description
            status
            start_date
            duration
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createsprint ($input: CreateSprintInput!) {
        createsprint (input: $input) {
            id
            name
            description
            status
            start_date
            duration
        }
    }`,
    variables: {
      input: {
        name: data.name,
        description: data.description,
        status: data.status,
        start_date: data.start_date,
        duration: data.duration,
      },
    },
  };
  console.log(data);

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updatesprint ($input: UpdateSprintInput!) {
        updatesprint (input: $input) {
            id
            name
            description
            status
            start_date
            duration
        }
    }`,
    variables: {
      input: data,
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
      }
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
  const cookieStore = await cookies();
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
      }
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

export async function get_sprintrequirements(sprintId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query sprintrequirements ($sprint_id: Int!, $page: Int!, $size: Int!) {
        sprintrequirements (sprint_id: $sprint_id, page: $page, size: $size) {
            total
            requirements {
                id
                name
                description
                purpose
                status
                bussiness_value
                assigned_to
                sprint_id
            }
        }
    }`,
    variables: {
      sprint_id: sprintId,
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
      }
    );

    // console.log(response?.data?.data);
    // If the response is successful, return the sprints data
    return response?.data?.data?.sprintrequirements || {};
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching sprints:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function create_sprintrequirements(sprintId, requirementId) {
  const cookieStore = await cookies();
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
      }
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
    query: `mutation deleterequirementsprint ($requirement_id: Int!, $sprint_id: Int!) {
        deleterequirementsprint (requirement_id: $requirement_id, sprint_id: $sprint_id) {
            id

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
      }
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
  const cookieStore = await cookies();
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `query requirement ($id: Int!) {
        requirement (id: $id) {
            id
            name
            description
            purpose
            status
            bussiness_value
            assigned_to
            sprint_id
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.requirement || [];
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createrequirement ($input: CreateRequirementInput!) {
        createrequirement (input: $input) {
            id
            name
            description
            purpose
            status
            bussiness_value
            assigned_to
            sprint_id
        }
    }`,
    variables: {
      input: {
        name: data.name,
        description: data.description,
        purpose: data.purpose,
        status: data.status,
        bussiness_value: data.bussiness_value,
        assigned_to: data.assigned_to,
        sprint_id: data.sprint_id,
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updaterequirement ($input: UpdateRequirementInput!) {
        updaterequirement (input: $input) {
            id
            name
            description
            purpose
            status
            bussiness_value
            assigned_to
            sprint_id
        }
    }`,
    variables: {
      input: data,
    },
  };

  console.log(data);
  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deleterequirement ($id: Int!) {
        deleterequirement (id: $id)
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.requirement || [];
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

export async function get_requirementtests(requirementId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query requirementtests ($requirement_id: Int!, $page: Int!, $size: Int!) {
        requirementtests (requirement_id: $requirement_id, page: $page, size: $size) {
        total
        tests {
            id
            name
            description
            steps
            expected_result
            requirement_id
            }
        }
    }`,
    variables: {
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.requirementtests || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching tests:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_requirementtests(requirementId, testId) {
  const cookieStore = await cookies();
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
      }
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: `query tests ($page: Int!, $size: Int!) {
            tests (page: $page, size: $size) {
                total
                tests{
                    id
                    name
                    description
                    steps
                    expected_result
                    requirement_id
                }
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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.tests || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching tests:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
export async function get_drop_tests() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: `query getdroptests {
        getdroptests {
            id
            name
        }
    }`,
    variables: {},
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.getdroptests || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching drop down tests:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_test(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `query test ($id: Int!) {
        test (id: $id) {
            id
            name
            description
            steps
            expected_result
            requirement_id
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.test || [];
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createtest ($input: CreateTestInput!) {
        createtest (input: $input) {
            id
            name
            description
            steps
            expected_result
            requirement_id
        }
    }`,
    variables: {
      input: {
        name: data.name,
        description: data.description,
        steps: data.steps,
        expected_result: data.expected_result,
        requirement_id: data.requirement_id,
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updatetest ($input: UpdateTestInput!) {
        updatetest (input: $input) {
            id
            name
            description
            steps
            expected_result
            requirement_id
        }
    }`,
    variables: {
      input: data,
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deletetest ($id: Int!) {
        deletetest (id: $id)
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
      }
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;
  const pdata = {
    query: `query testsets ($page: Int!, $size: Int!) {
        testsets (page: $page, size: $size) {
            total
            testsets {
                id
                name
                description
            }
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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.testsets || [];
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
  const cookieStore = await cookies();
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.testset || [];
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createtestset ($input: CreateTestsetInput!) {
        createtestset (input: $input) {
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.testset || [];
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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updatetestset ($input: UpdateTestsetInput!) {
        updatetestset (input: $input) {
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
      }
    );

    // If the response is successful, return the sprints data
    return response?.data?.data?.testset || [];
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
  const cookieStore = await cookies();
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
      }
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

export async function get_testsettestinstances(testsetId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query testsettests ($testset_id: Int!, $page: Int!, $size: Int!) {
        testsettests (testset_id: $testset_id, page: $page, size: $size) {
            total
            testsettests {
                id
                name
                steps
                expected_result
                severity
            }
        }
    }`,
    variables: {
      testset_id: testsetId,
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
      }
    );

    // If the response is successful, return the testinstances data
    return response?.data?.data?.testsettests || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testinstances:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testsettestinstances(testsetId, testinstanceId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createtestsettestinstance($testset_id: Int!, $testinstance_id: Int! ) {
	        createtestsettestinstance($testset_id: $testset_id, $testinstance_id: $testinstance_id)
		}`,
    variables: {
      testset_id: testsetId,
      testinstance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the added  testinstance on to testset data
    return response?.data?.data?.testinstance || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error adding testset to  testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testsettestinstances(testsetId, testinstanceId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
	        deletetestsettestinstance($testset_id: Int!, $testinstance_id: Int! ) {
				deletetestsettestinstance($testset_id: $testset_id, $testinstance_id: $testset_id)
		} `,
    variables: {
      testset_id: testsetId,
      testinstance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the deleted testinstance from testset data
    return response?.data?.data?.testinstance || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing testinstance  from testset:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph testinstance  requests
//#######################################################

export async function get_testinstances() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query { testinstances($page: Int!, $size: Int!){
	     		testinstances($page: $page, $size: $size) {
	             id
	             testid
	             testsetid
	             issues
	             testruns
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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
          Pragma: "no-cache",
        },
      }
    );

    // If the response is successful, return the testinstances data
    return response?.data?.data?.testinstances || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testinstances:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testinstance(testinstance_id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` query { testinstance($id: Int!)  {
     		testinstance($id: $id) {
          		 id
            	 testid
            	 testsetid
            	 issues
            	 testruns
            	}
          }
        }`,
    variables: {
      id: testinstance_id,
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
      }
    );

    // If the response is successful, return the testinstances data
    return response?.data?.data?.testinstances || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testinstance(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createtestinstance ($input: CreateTestInstanceInput!) {
        createtestinstance (input: $input) {
            id
            test_id
            testset_id
            severity
        }
    }`,
    variables: {
      input: {
        test_id: data.test_id,
        testset_id: data.testset_id,
        severity: data.severity ? data.severity : "Low",
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
      }
    );

    // If the response is successful, return the testinstance data
    return response?.data?.data?.test_instance || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Creating testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
export async function create_batch_testinstance(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createbatchtestinstance ($input: CreateBatchTestInstanceInput!) {
        createbatchtestinstance (input: $input)

    }`,
    variables: {
      input: data,
    },
  };

  try {
    // Make the request with the correct URL and headers using fetch
    const response = await fetch(
      `${BaseURL}/${postURL}/${current_project.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token, // Auth token from cookies
        },
        body: JSON.stringify(pdata), // GraphQL query payload
      }
    );

    // Parse the JSON response
    const responseData = await response.json();
    console.log(responseData);
    // If the response is successful, return the testinstance data
    return [response?.data?.data?.createbatchtestinstance] || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Creating testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_testinstance(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updatetestinstance ($input: UpdateTestInstanceInput!) {
        updatetestinstance (input: $input) {
            id
            test_id
            testset_id
            severity
        }
    }`,
    variables: {
      input: data,
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
      }
    );

    // If the response is successful, return the testinstance data
    return response?.data?.data?.testinstances || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error updating testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testinstance(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deletetestinstance ($id: Int!) {
        deletetestinstance (id: $id)
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
      }
    );

    // If the response is successful, return the testinstance data
    return response?.data?.data?.testinstance || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing testinstance:", error);

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
// ######################################

export async function get_testinstanceissues(
  testinstanceId,
  issueId,
  page,
  size
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query testinstanceissues($testinstance_id: Int!, $page: Int!, $size: Int!) {
            testinstanceissues( $testinstance_id: $testinstance_id, $page: $page, $size: $size) {
           	 id
             testid
             testsetid
             issues
             testruns
            }
            }
          }`,
    variables: {
      testinstance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the issues data
    return response?.data?.data?.issues || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching issues:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testinstanceissues(testinstanceId, issueId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createtestinstanceissue($testinstance_id: Int!, $issue_id: Int! ) {
	        createtestinstanceissue($testinstance_id: $testinstance_id, $issue_id: $issue_id)
		}`,
    variables: {
      testinstance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the added  issue on to testinstance data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error adding testinstance to  issue:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testinstanceissues(testinstanceId, issueId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
	        deletetestinstanceissue($testinstance_id: Int!, $issue_id: Int! ) {
				deletetestinstanceissue($testinstance_id: $testinstance_id, $issue_id: $testinstance_id)
		} `,
    variables: {
      testinstance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the deleted issue from testinstance data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing issue  from testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testinstancetestruns(testinstanceId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query testinstancetestruns ($test_instance_id: Int!, $page: Int!, $size: Int!) {
        testinstancetestruns (test_instance_id: $test_instance_id, page: $page, size: $size) {
            total
             test_runs {
                id
                test_instance_id
                run_status
                result
                created_at
                updated_at
            }
        }
    }`,
    variables: {
      test_instance_id: testinstanceId,
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
      }
    );

    // If the response is successful, return the testruns data
    return response?.data?.data?.testinstancetestruns || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testruns:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testtestruns(testId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query testtestruns ($test_id: Int!, $page: Int!, $size: Int!) {
            testtestruns (test_id: $test_id, page: $page, size: $size) {
            total
                test_runs {
                id
                test_instance_id
                run_status
                result
                created_at
                updated_at
            }
        }
    }`,
    variables: {
      test_id: testId,
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
      }
    );

    // If the response is successful, return the testruns data
    return response?.data?.data?.testtestruns || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testruns:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testinstancetestruns(testinstanceId, testrunId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createtestinstancetestrun($testinstance_id: Int!, $testrun_id: Int! ) {
	        createtestinstancetestrun($testinstance_id: $testinstance_id, $testrun_id: $testrun_id)
		}`,
    variables: {
      testinstance_id: testinstanceId,
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the added  testrun on to testinstance data
    return response?.data?.data?.testrun || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error adding testinstance to  testrun:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testinstancetestruns(testinstanceId, testrunId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
	        deletetestinstancetestrun($testinstance_id: Int!, $testrun_id: Int! ) {
				deletetestinstancetestrun($testinstance_id: $testinstance_id, $testrun_id: $testinstance_id)
		} `,
    variables: {
      testinstance_id: testinstanceId,
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the deleted testrun from testinstance data
    return response?.data?.data?.testrun || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing testrun  from testinstance:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph testrun  requests
//#######################################################

export async function get_testruns() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query { testruns($page: Int!, $size: Int!){
	     		testruns($page: $page, $size: $size) {
	             id
	             testinstanceid
	             runstatus
	             result
	             severity
	             documents

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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the testruns data
    return response?.data?.data?.testruns || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testruns:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testrun(testrun_id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` query { testrun($id: Int!)  {
     		testrun($id: $id) {
          		 id
            	 testinstanceid
            	 runstatus
            	 result
            	 severity
            	 documents
            	}
          }
        }`,
    variables: {
      id: testrun,
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
      }
    );

    // If the response is successful, return the testruns data
    return response?.data?.data?.testruns || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching testrun:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testrun(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createtestrun ($input: CreateTestRunInput!) {
        createtestrun (input: $input) {
            id
            test_instance_id
            run_status
            result
            created_at
            updated_at
        }
    }`,
    variables: {
      input: {
        test_instance_id: data.test_instance_id,
        run_status: data.run_status,
        result: data.result,
      },
    },
  };

  console.log(pdata);

  try {
    const response = await axios.post(
      `${BaseURL}/${postURL}/${current_project?.id}`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the testrun data
    return response?.data?.data?.testrun || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Creating testrun:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_testrun(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updatetestrun ($input: UpdateTestRunInput!) {
        updatetestrun (input: $input) {
            id
            test_instance_id
            run_status
            result
            created_at
            updated_at
        }
    }`,
    variables: {
      input: data,
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
      }
    );

    // If the response is successful, return the testrun data
    return response?.data?.data?.testruns || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error updating testrun:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testrun(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deletetestrun ($id: Int!) {
        deletetestrun (id: $id)
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
      }
    );

    // If the response is successful, return the testrun data
    return response?.data?.data?.testrun || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing testrun:", error);

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
// ######################################

export async function get_testrunissues(testrunId, issueId, page, size) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query testrunissues($testrun_id: Int!, $page: Int!, $size: Int!) {
            testrunissues( $testrun_id: $testrun_id, $page: $page, $size: $size) {
           	 id
             testinstanceid
             runstatus
             result
             severity
             documents
            }
            }
          }`,
    variables: {
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the issues data
    return response?.data?.data?.issues || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching issues:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testrunissues(testrunId, issueId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createtestrunissue($testrun_id: Int!, $issue_id: Int! ) {
	        createtestrunissue($testrun_id: $testrun_id, $issue_id: $issue_id)
		}`,
    variables: {
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the added  issue on to testrun data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error adding testrun to  issue:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testrunissues(testrunId, issueId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
	        deletetestrunissue($testrun_id: Int!, $issue_id: Int! ) {
				deletetestrunissue($testrun_id: $testrun_id, $issue_id: $testrun_id)
		} `,
    variables: {
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the deleted issue from testrun data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing issue  from testrun:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_testrundocuments(testrunId, documentId, page, size) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query testrundocuments($testrun_id: Int!, $page: Int!, $size: Int!) {
            testrundocuments( $testrun_id: $testrun_id, $page: $page, $size: $size) {
           	 id
             testinstanceid
             runstatus
             result
             severity
             documents
            }
            }
          }`,
    variables: {
      testrun_id: testrunId,
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
      }
    );

    // If the response is successful, return the documents data
    return response?.data?.data?.documents || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching documents:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_testrundocuments(testrunId, documentId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createtestrundocument($testrun_id: Int!, $document_id: Int! ) {
	        createtestrundocument($testrun_id: $testrun_id, $document_id: $document_id)
		}`,
    variables: {
      testrun_id: testrunId,
      document_id: documentId,
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
      }
    );

    // If the response is successful, return the added  document on to testrun data
    return response?.data?.data?.document || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error adding testrun to  document:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_testrundocuments(testrunId, documentId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation {
	        deletetestrundocument($testrun_id: Int!, $document_id: Int! ) {
				deletetestrundocument($testrun_id: $testrun_id, $document_id: $testrun_id)
		} `,
    variables: {
      testrun_id: testrunId,
      document_id: documentId,
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
      }
    );

    // If the response is successful, return the deleted document from testrun data
    return response?.data?.data?.document || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing document  from testrun:", error);

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
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query issues ($page: Int!, $size: Int!) {
        issues (page: $page, size: $size) {
            total
            issues{
                id
                issue_name
                issue_status
                issue_description
                test_instance_id
                test_run_id
            }
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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the issues data
    return response?.data?.data?.issues || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching issues:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_issue(issue_id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` query { issue($id: Int!)  {
     		issue($id: $id) {
          		 id
            	 issuename
            	 issuestatus
            	 issuedescription
            	}
          }
        }`,
    variables: {
      id: issue,
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
      }
    );

    // If the response is successful, return the issues data
    return response?.data?.data?.issues || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching issue:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_issue(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation createissue ($input: CreateIssueInput!) {
        createissue (input: $input) {
            id
            issue_name
            issue_status
            issue_description
        }
    }`,
    variables: {
      input: {
        issue_name: data.issue_name,
        issue_status: data.issue_status,
        issue_description: data.issue_description,
        test_run_id: data.test_run_id,
        test_instance_id: data.test_instance_id,
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
      }
    );

    // If the response is successful, return the issue data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Creating issue:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_issue(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation updateissue ($input: UpdateIssueInput!) {
        updateissue (input: $input) {
            id
            issue_name
            issue_status
            issue_description
            test_run_id
            test_instance_id
        }
    }`,
    variables: {
      input: data,
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
      }
    );

    // If the response is successful, return the issue data
    return response?.data?.data?.issues || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error updating issue:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_issue(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: `mutation deleteissue ($id: Int!) {
        deleteissue (id: $id)
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
      }
    );

    // If the response is successful, return the issue data
    return response?.data?.data?.issue || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing issue:", error);

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
// ######################################

//#######################################################
//  graph document  requests
//#######################################################

export async function get_documents() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: ` query { documents($page: Int!, $size: Int!){
	     		documents($page: $page, $size: $size) {
	             id
	             name
	             file_url
	             requirementid
	             sprintid
	             runid

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
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the documents data
    return response?.data?.data?.documents || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching documents:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function get_document(document_id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` query { document($id: Int!)  {
     		document($id: $id) {
          		 id
            	 name
            	 file_url
            	 requirementid
            	 sprintid
            	 runid
            	}
          }
        }`,
    variables: {
      id: document,
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
      }
    );

    // If the response is successful, return the documents data
    return response?.data?.data?.documents || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching document:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function create_document(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation createdocument($input: CreateDocumentInput) {
	        createdocument($input: $input) {
	         id
	         name
	         file_url
	         requirementid
	         sprintid
	         runid

	        }
		}`,
    variables: {
      input: {
        name: data.name,
        file_url: data.file_url,
        requirementid: data.requirementid,
        sprintid: data.sprintid,
        runid: data.runid,
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
      }
    );

    // If the response is successful, return the document data
    return response?.data?.data?.document || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Creating document:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_document(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation { updatedocument($input: UpdateDocumentInput) {
     		updatedocument($input: $input)
        		 id
          	 name
          	 file_url
          	 requirementid
          	 sprintid
          	 runid

          }
        }`,
    variables: {
      input: {
        id: data.id,
        name: data.name,
        file_url: data.file_url,
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
      }
    );

    // If the response is successful, return the document data
    return response?.data?.data?.documents || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error updating document:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_document(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const current_project = JSON.parse(cookieStore.get("current_project")?.value);

  const pdata = {
    query: ` mutation deletedocument($id: Int!) {
          deletedocument($id: $id)
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
      }
    );

    // If the response is successful, return the document data
    return response?.data?.data?.document || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error Deleteing document:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
