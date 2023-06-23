import React, { useState } from "react";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import InnerLoad from "../../components/Loading/InnerLoad";
import Input from "../../components/Inputs/InputsSignPages";

import { CreateUserParams } from "../../utils/users";

import { signUp } from "../../services/userAPI";

function SignUpPage(): JSX.Element {
  document.title = `getJobs - Sign Up`;

  const navigate = useNavigate();

  const errorsInit = {
    name: false,
    birthday: false,
    email: false,
    cpf: false,
    password: false,
    confirmedPassword: false,
    profilePicture: false,
  };
  const [signUpData, setSignUpData] = useState({
    name: "",
    birthday: "",
    email: "",
    cpf: "",
    password: "",
    confirmedPassword: "",
    profilePicture: "",
  });
  const [signUpDataError, setSignUpDataError] = useState(errorsInit);
  const [signUpError, setSignUpError] = useState(false);
  const [load, setLoad] = useState(false);
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [duplicatedCPF, setDuplicatedCPF] = useState(false);

  const emailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpDataError({ ...signUpDataError, [e.target.name]: false });
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignUpError(false);
    setLoad(true);
    setSignUpDataError(errorsInit);
    setDuplicatedEmail(false);
    setDuplicatedCPF(false);

    const body = {
      name: signUpData.name,
      birthday: new Date(signUpData.birthday),
      email: signUpData.email,
      cpf: signUpData.cpf.replaceAll(".", "").replace("-", ""),
      password: signUpData.password,
      profilePicture: signUpData.profilePicture,
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
        if (err.response.status === httpStatus.CONFLICT)
          if (
            err.response.data.message ===
            "There is already an user with given email"
          )
            duplicateEmailError();
        if (
          err.response.data.message ===
          "There is already an user with given CPF"
        )
          duplicateCPFError();
        setLoad(false);
        setSignUpError(true);
      });
  }

  function duplicateEmailError() {
    setDuplicatedEmail(true);
    setSignUpDataError({ ...signUpDataError, email: true });
  }

  function duplicateCPFError() {
    setDuplicatedCPF(true);
    setSignUpDataError({ ...signUpDataError, cpf: true });
  }

  function checkAge(birthDate: Date): boolean {
    return moment().diff(birthDate, "years") < 18;
  }

  function checkUrl(url: string): boolean {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  }

  function checkErrors(body: CreateUserParams): CheckErrorsParams {
    const checkErrors = {
      birthday: checkAge(body.birthday),
      email: !emailValidation.test(body.email),
      password: body.password.length < 6,
      name: body.name.length <= 1,
      confirmedPassword: signUpData.password !== signUpData.confirmedPassword,
      cpf: body.cpf.length !== 11,
      profilePicture: !checkUrl(body.profilePicture),
    };

    console.log(checkErrors);

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
      profilePicture: boolean;
    };
  };

  return (
    <>
      <main className="select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center items-center box-border">
        <div className="bg-white min-h-[80vh] min-w-[370px] flex flex-col justify-center items-center w-1/4 gap-10 my-[50px] rounded-lg box-border py-4">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <form
            onSubmit={submit}
            className="w-[75%] flex flex-col justify-center gap-[1rem] items-center box-border"
          >
            <Input
              signUpDataError={signUpDataError.name}
              load={load}
              signUpData={signUpData.name}
              onChange={handleInput}
              placeholder="John Doe"
              type="text"
              name="name"
              id="name"
              errorMessage="Your name must have at least one character"
            />
            <Input
              signUpDataError={signUpDataError.birthday}
              load={load}
              signUpData={signUpData.birthday}
              onChange={handleInput}
              placeholder="00/00/0000"
              type="date"
              name="birthday"
              id="birthday"
              errorMessage="Registration is only for individuals aged 18 and above"
            />
            <Input
              signUpDataError={signUpDataError.email}
              load={load}
              signUpData={signUpData.email}
              onChange={handleInput}
              placeholder="my.email@example.com"
              type="email"
              name="email"
              id="email"
              errorMessage={
                !duplicatedEmail
                  ? "Please enter a valid email address"
                  : "This email is already registered"
              }
            />
            <Input
              signUpDataError={signUpDataError.cpf}
              load={load}
              signUpData={signUpData.cpf}
              onChange={handleInput}
              placeholder="000.000.000-00"
              type="text"
              name="cpf"
              id="cpf"
              errorMessage={
                !duplicatedCPF
                  ? "The CPF must have exactly 11 digits"
                  : "This CPF is already registered"
              }
            />
            <Input
              signUpDataError={signUpDataError.password}
              load={load}
              signUpData={signUpData.password}
              onChange={handleInput}
              placeholder="******"
              type="password"
              name="password"
              id="password"
              errorMessage="Your password must have at least 6 digits"
            />
            <Input
              signUpDataError={signUpDataError.confirmedPassword}
              load={load}
              signUpData={signUpData.confirmedPassword}
              onChange={handleInput}
              placeholder="******"
              type="password"
              name="confirm Password"
              id="confirmedPassword"
              errorMessage="The passwords must be identical"
            />
            <Input
              signUpDataError={signUpDataError.profilePicture}
              load={load}
              signUpData={signUpData.profilePicture}
              onChange={handleInput}
              placeholder="http://url.com/profilePicture.png"
              type="text"
              name="profile Picture"
              id="profilePicture"
              errorMessage="Invalid URL"
            />
            <button
              disabled={load}
              type="submit"
              className="font-roboto font-medium tracking-wide bg-red-700 h-[45px] w-[100%] text-md rounded-md text-gray-100 p-2 box-border hover:opacity-80"
            >
              {!load ? "Sign Up" : <InnerLoad height={25} />}
            </button>
            {signUpError ? (
              <div className="text-xs text-red-700 italic px-1">
                There was an error during registration, please check all fields.
              </div>
            ) : (
              <></>
            )}
          </form>
          <h1
            onClick={() => navigate("/")}
            className="font-roboto font-medium hover:underline text-sm hover:opacity-80 cursor-pointer"
          >
            Log in!
          </h1>
        </div>
      </main>
    </>
  );
}

export default SignUpPage;
