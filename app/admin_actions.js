"use server";
import axios from "axios";
import { cookies } from "next/headers";

const BaseURL = "https://open-btm.onrender.com/api/v1";
// const BaseURL = "http://localhost:8500/api/v1";

//#######################################################
//  graph admin requests
//#######################################################

export async function get_projects() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query projects ($page: Int!, $size: Int!) {
        projects (page: $page, size: $size) {
            total
            projects {
                id
                name
                description
                uuid
                status
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
      `${BaseURL}/admin`,
      pdata, // Ensure pdata is correctly structured
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    return response?.data?.data?.projects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching s:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function get_project(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `query project ($id: Int!) {
        project (id: $id) {
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
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );
    // If the response is successful, return the projects data

    return response?.data?.data?.project || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [];
    }

    // If no specific error details, return a generic message
    return [];
  }
}

export async function create_project(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation createproject ($input: CreateProjectInput!) {
        createproject (input: $input) {
          id
          name
          description
          uuid
          status
        }
    }`,
    variables: {
      input: {
        name: data.name,
        description: data.description,
      },
    },
  };
  console.log(data);

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.projects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_project(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation updateproject ($input: UpdateProjectInput!) {
        updateproject (input: $input) {
            id
            name
            description
            uuid
            status
        }
    }`,
    variables: {
      input: data,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.project || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_project(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation deleteproject ($id: Int!) {
        deleteproject (id: $id)
    }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.projects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

//#######################################################
//  graph admin requests
//#######################################################

export async function get_users() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const page_size = cookieStore.get("page_size")?.value;
  const current_page = cookieStore.get("current_page")?.value;

  const pdata = {
    query: `query users ($page: Int!, $size: Int!) {
        users (page: $page, size: $size) {
        total
        users {
            id
            name
            email
            uuid
            disabled
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
      `${BaseURL}/admin`,
      pdata, // Ensure pdata is correctly structured
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    return response?.data?.data?.users || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching users:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function get_roles() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `query roles {
        roles {
            id
            name
            description
            active
        }
    }`,
    variables: {},
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Ensure pdata is correctly structured
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    return response?.data?.data?.roles || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching roles:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function get_drop_users() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `  query dropusers {
          dropusers {
              id
              name
              email
          }
      }`,
    variables: {},
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Ensure pdata is correctly structured
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    return response?.data?.data?.dropusers || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching dropusers:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return { error: error };
    }

    // If no specific error details, return a generic message
    return { error: "Unkown error happened" };
  }
}

export async function get_user(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `query user ($id: Int!) {
        user (id: $id) {
            id
            name
            email
            uuid
            disabled
        }
    }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );
    // If the response is successful, return the projects data

    return response?.data?.data?.user || {};
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [];
    }

    // If no specific error details, return a generic message
    return [];
  }
}

export async function create_user(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation createuser ($input: UserInput!) {
        createuser (input: $input) {
            id
            name
            email
            uuid
            disabled
        }
    }`,
    variables: {
      input: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    },
  };
  console.log(data);

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.projects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_user(data, user_id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation updateuser ($input: UserUdateInput!, $user_id: Int!) {
        updateuser (input: $input, user_id: $user_id)
    }`,
    variables: {
      input: data,
      user_id: user_id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.updateuser || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching updatedusers:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function update_password(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation changeresetuserpassword ($password: String!, $email: String!, $reset: Boolean!) {
        changeresetuserpassword (password: $password, email: $email, reset: $reset)
    }`,
    variables: {
      ...data,
    },
  };

  console.log(data);

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.changeresetuserpassword || false;
  } catch (error) {
    // Log error details for debugging
    console.error("Error updating user password:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}

export async function delete_user(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const pdata = {
    query: `mutation deleteproject ($id: Int!) {
        deleteproject (id: $id)
    }`,
    variables: {
      id: id,
    },
  };

  try {
    const response = await axios.post(
      `${BaseURL}/admin`,
      pdata, // Directly passing the data
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-TOKEN": token,
        },
      }
    );

    // If the response is successful, return the projects data
    return response?.data?.data?.projects || [];
  } catch (error) {
    // Log error details for debugging
    console.error("Error fetching projects:", error);

    // Check if error response contains specific details and return them
    if (error?.response?.data) {
      return [error];
    }

    // If no specific error details, return a generic message
    return ["Unkown error happened"];
  }
}
