import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import InnerLoad from "../../components/Loading/InnerLoad";
import Input from "../../components/Inputs/InputsSignPages";

import { signIn } from "../../services/authAPI";

function SignInPage(): JSX.Element {
  document.title = `getJobs - Sign In`;

  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const [signUpDataError, setSignUpDataError] = useState(false);
  const { setUserData } = useContext(UserContext);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpDataError(false);
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function login() {
    setLoad(true);
    signIn(signUpData)
      .then((res) => {
        setLoad(false);
        setUserData(res);
        navigate("/main");
      })
      .catch(() => {
        setLoad(false);
        setSignUpDataError(true);
      });
  }

  return (
    <>
      <main className="select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center items-center box-border">
        <div className="bg-white min-h-[70vh] min-w-[370px] flex flex-col justify-center items-center w-1/4 gap-10 my-[50px] rounded-lg box-border">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <div className="w-[75%] flex flex-col justify-center items-center gap-[1rem] box-border">
            <Input
              signUpDataError={signUpDataError}
              load={load}
              signUpData={signUpData.email}
              onChange={handleInput}
              placeholder="my.email@example.com"
              type="email"
              name="email"
              id="email"
              errorMessage="Invalid email or password"
            />
            <Input
              signUpDataError={signUpDataError}
              load={load}
              signUpData={signUpData.password}
              onChange={handleInput}
              placeholder="******"
              type="password"
              name="password"
              id="password"
              errorMessage="Invalid email or password"
            />
            <button
              disabled={load}
              onClick={() => login()}
              className="font-roboto font-medium tracking-wide bg-red-700 h-[45px] w-[100%] text-md rounded-md text-gray-100 p-2 box-border hover:opacity-80"
            >
              {!load ? "Sign In" : <InnerLoad height={25} />}
            </button>
          </div>
          <h1
            onClick={() => navigate("/sign-up")}
            className="font-roboto font-medium hover:underline text-sm hover:opacity-80 cursor-pointer"
          >
            Create new account!
          </h1>
        </div>
      </main>
    </>
  );
}

export default SignInPage;
