import React, { useState } from "react";
import InnerLoad from "../../components/Loading/InnerLoad";
import { useNavigate } from "react-router-dom";

function SignInPage(): JSX.Element {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    date: "",
    email: "",
    cpf: "",
    password: "",
    confirmedPassword: "",
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <main className="select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center items-center box-border">
        <div className="bg-white min-h-[70vh] min-w-[370px] flex flex-col justify-center items-center w-1/4 gap-10 my-[50px] rounded-lg box-border">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <div className="w-[75%] flex flex-col justify-center items-center gap-[1rem] box-border">
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2`}
            >
              <legend className="bg-gray-500 text-white px-1 rounded-lg">email</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="my.email@example.com"
                id="email"
                type="text"
                name="email"
                value={signUpData.email}
                onChange={handleInput}
                required
              />
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2`}
            >
              <legend className="bg-gray-500 text-white px-1 rounded-lg">password</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="******"
                id="password"
                type="text"
                name="password"
                value={signUpData.password}
                onChange={handleInput}
                required
              />
            </fieldset>
            <button
              disabled={load}
              onClick={() => setLoad(!load)}
              className="font-roboto font-medium tracking-wide bg-red-700 h-[45px] w-[100%] text-md rounded-md text-gray-100 p-2 box-border hover:opacity-80"
            >
              {!load ? "Entrar" : <InnerLoad height={25} />}
            </button>
          </div>
          <h1
            onClick={() => navigate("/sign-up")}
            className="font-roboto font-medium underline text-sm hover:opacity-80 cursor-pointer"
          >
            Ainda não tem cadastro? Clique aqui!
          </h1>
        </div>
      </main>
    </>
  );
}

export default SignInPage;
