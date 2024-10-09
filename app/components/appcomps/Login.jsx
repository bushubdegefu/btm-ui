import { useState } from "react";
import { SingleInput, PasswordInput, CheckBoxInput } from "../generic/input";
import { NormalButton } from "../generic/button";
import { useLogInStore } from "@/app/store/loginstore";

export function LogInPage() {
  const login = useLogInStore((state) => state.setToken);

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  async function handleClick() {
    login(values);
  }

  function handleShow() {
    setShow(!show);
  }

  const handleInputChange = (event) => {
    event.persist();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValues((values) => ({
      ...values,
      [target.name]: value,
    }));
  };

  return (
    <div className="w-full flex-col">
      <div className="items-start justify-center w-11/12 h-auto p-2 m-2">
        <title>Login</title>
        <div className="flex w-full content-center items-center justify-center h-full">
          <div className="w-full sm:w-7/12 md:w-6/12  lg:w-5/12 xl:w-4/12 sm:px-4 py-5 bg-gray-200 rounded-xl shadow">
            <div className="relative bg-slate-100 opacity-90 -mt-12 mx-auto  flex flex-col min-w-0 break-words w-full mb-1 shadow-lg rounded-lg  border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-400 text-center mb-3 font-bold">
                  <small>sign in with credentials</small>
                </div>
                <form>
                  <SingleInput
                    name="email"
                    label="Email"
                    inputType="text"
                    placeHolder="beimdegefu@gmail.com"
                    value={values.email}
                    handler={handleInputChange.bind(this)}
                  />

                  <PasswordInput
                    name="password"
                    label="Password"
                    inputType={show ? "text" : "password"}
                    placeHolder="password"
                    value={values.password}
                    handler={handleInputChange.bind(this)}
                  />

                  <br />
                  <CheckBoxInput
                    value={show}
                    label="Show Passowrd"
                    name="show"
                    handler={handleShow.bind(this)}
                  />
                  <br />

                  <NormalButton
                    label="Sign In"
                    handleClick={handleClick.bind(this)}
                  />
                </form>
              </div>
            </div>

            <div className="flex flex-wrap pt-0 relative">
              <div className="w-1/2 ">
                <a href="#pablo" className="text-black-200">
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a className="text-black-200" href="/signup">
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center pb-2 px-5">
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            To login as super user you can use superuser@mail.com. password is
            "default@123" for all users.
          </span>
        </div>
      </div>
    </div>
  );
}
