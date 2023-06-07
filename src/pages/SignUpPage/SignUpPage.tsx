import React, { useState } from "react";
import InnerLoad from "../../components/Loading/InnerLoad";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "jquery-mask-plugin";

function SignUpPage(): JSX.Element {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    date: "00/00/0000",
    email: "",
    cpf: "",
    password: "",
    confirmedPassword: "",
  });

  console.log(signUpData.date);
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("rodei");
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  $("#cpf").mask("000.000.000-00");
  $("#date").mask("00/00/0000");

  return (
    <>
      <main className="select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center items-center box-border">
        <div className="bg-white min-h-[80vh] min-w-[370px] flex flex-col justify-center items-center w-1/4 gap-10 my-[50px] rounded-lg box-border py-4">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <form className="w-[75%] flex flex-col justify-center items-center gap-[1rem] box-border">
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>name</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="John Doe"
                id="name"
                type="text"
                name="name"
                value={signUpData.name}
                onChange={handleInput}
                required
              />
            </fieldset>
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>date</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="00/00/0000"
                id="date"
                type="date"
                name="date"
                value={signUpData.date}
                onChange={handleInput}
                required
              />
            </fieldset>
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>email</legend>
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
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>cpf</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="000.000.000-00"
                id="cpf"
                type="text"
                name="cpf"
                value={signUpData.cpf}
                onChange={handleInput}
                required
              />
            </fieldset>
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>password</legend>
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
            <fieldset className="bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2">
              <legend>confirm password</legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="******"
                id="confirmedPassword"
                type="text"
                name="confirmedPassword"
                value={signUpData.confirmedPassword}
                onChange={handleInput}
                required
              />
            </fieldset>

            <button
              disabled={load}
              onClick={() => setLoad(!load)}
              className="font-roboto font-medium tracking-wide bg-red-700 h-[45px] w-[100%] text-md rounded-md text-gray-100 p-2 box-border hover:opacity-80"
            >
              {!load ? "Cadastrar" : <InnerLoad height={25} />}
            </button>
          </form>
          <h1
            onClick={() => navigate("/")}
            className="font-roboto font-medium underline text-sm hover:opacity-80 cursor-pointer"
          >
            Já tem cadastro? Clique aqui!
          </h1>
        </div>
      </main>
    </>
  );
}

export default SignUpPage;
