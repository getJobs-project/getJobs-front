import React, { useState } from "react";
import InnerLoad from "../../components/Loading/InnerLoad";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "jquery-mask-plugin";
import { signUp } from "../../services/userAPI";
import moment from "moment";
import { CreateUserParams } from "@/utils/users";

function SignUpPage(): JSX.Element {
  $("#cpf").mask("000.000.000-00");

  const navigate = useNavigate();
  const errorsInit = {
    name: false,
    birthday: false,
    email: false,
    cpf: false,
    password: false,
    confirmedPassword: false,
  };

  const [load, setLoad] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: "",
    birthday: "",
    email: "",
    cpf: "",
    password: "",
    confirmedPassword: "",
  });
  const [signUpDataError, setSignUpDataError] = useState(errorsInit);
  const [signUpError, setSignUpError] = useState(false);

  const emailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpDataError({ ...signUpDataError, [e.target.name]: false });
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoad(true);
    setSignUpDataError(errorsInit);

    const body = {
      name: signUpData.name,
      birthday: new Date(signUpData.birthday),
      email: signUpData.email,
      cpf: signUpData.cpf.replaceAll(".", "").replace("-", ""),
      password: signUpData.password,
    };

    const { param, errors } = checkErrors(body);

    if (param) {
      setSignUpDataError(errors);
      return setLoad(false);
    }

    signUp(body)
      .then(() => {
        setLoad(false);
        navigate("/");
      })
      .catch((err) => {
        setSignUpError(true);
        console.error(err);
      });
  }

  function checkAge(birthDate: Date): boolean {
    return moment().diff(birthDate, "years") < 18;
  }

  function checkErrors(body: CreateUserParams): CheckErrorsParams {
    const checkErrors = {
      birthday: checkAge(body.birthday),
      email: !emailValidation.test(body.email),
      password: body.password.length < 4,
      name: body.name.length <= 1,
      confirmedPassword: signUpData.password !== signUpData.confirmedPassword,
      cpf: body.cpf.length !== 11,
    };

    return {
      param: Object.values(checkErrors).some((e) => e === true),
      errors: checkErrors,
    };
  }

  type CheckErrorsParams = {
    param: boolean;
    errors: {
      birthday: boolean;
      email: boolean;
      password: boolean;
      name: boolean;
      confirmedPassword: boolean;
      cpf: boolean;
    };
  };

  return (
    <>
      <main className="select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center items-center box-border">
        <div className="bg-white min-h-[80vh] min-w-[370px] flex flex-col justify-center items-center w-1/4 gap-10 my-[50px] rounded-lg box-border py-4">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <form
            onSubmit={submit}
            className="w-[75%] flex flex-col justify-center items-center gap-[1rem] box-border"
          >
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
                signUpDataError.name ? "border-2 border-red-700" : ""
              }`}
            >
              {" "}
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                name
              </legend>
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
              {signUpDataError.name ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  O nome deve ter mais de um caractere!
                </legend>
              ) : (
                <></>
              )}
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
                signUpDataError.birthday ? "border-2 border-red-700" : ""
              }`}
            >
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                birthday
              </legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="00/00/0000"
                id="birthday"
                type="date"
                name="birthday"
                value={signUpData.birthday}
                onChange={handleInput}
                required
              />
              {signUpDataError.birthday ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  Cadastro apenas para maiores de 18.
                </legend>
              ) : (
                <></>
              )}
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
                signUpDataError.email ? "border-2 border-red-700" : ""
              }`}
            >
              {" "}
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                email
              </legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="my.email@example.com"
                id="email"
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleInput}
                required
              />
              {signUpDataError.email ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  Insira um email válido.
                </legend>
              ) : (
                <></>
              )}
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 data-te-animation-init
               data-te-animation-start="onHover" data-te-animation-reset=true data-te-animation=[tada] ${
                 signUpDataError.cpf
                   ? "border-2 border-red-700 animationStart"
                   : ""
               }`}
            >
              {" "}
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                cpf
              </legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="000.000.000-00"
                id="cpf"
                type="text"
                name="cpf"
                value={signUpData.cpf}
                onChange={handleInput}
              />
              {signUpDataError.cpf ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  O cpf deve ter 11 números.
                </legend>
              ) : (
                <></>
              )}
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
                signUpDataError.password ? "border-2 border-red-700" : ""
              }`}
            >
              {" "}
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                password
              </legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="******"
                id="password"
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleInput}
                required
              />
              {signUpDataError.password ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  A senha deve ter pelo menos 4 dígitos.
                </legend>
              ) : (
                <></>
              )}
            </fieldset>
            <fieldset
              className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
                signUpDataError.confirmedPassword
                  ? "border-2 border-red-700"
                  : ""
              }`}
            >
              {" "}
              <legend className="bg-gray-500 text-white px-1 rounded-lg">
                confirm password
              </legend>
              <input
                className="bg-gray-300 w-[100%] box-border  placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
                disabled={load}
                placeholder="******"
                id="confirmedPassword"
                type="password"
                name="confirmedPassword"
                value={signUpData.confirmedPassword}
                onChange={handleInput}
              />
              {signUpDataError.confirmedPassword ? (
                <legend className="text-sm bg-gray-100 text-red-700 px-1 rounded-lg border-2 border-red-700">
                  A senha deve ser igual a anterior.
                </legend>
              ) : (
                <></>
              )}
            </fieldset>

            <button
              disabled={load}
              type="submit"
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
