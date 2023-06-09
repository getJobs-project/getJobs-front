import React, { InputHTMLAttributes } from "react";
import $ from "jquery";
import "jquery-mask-plugin";

function Input({
  signUpDataError,
  load,
  signUpData,
  onChange,
  placeholder,
  name,
  type,
  errorMessage,
  id,
}: InputParams & InputHTMLAttributes<HTMLInputElement>) {
  $("#cpf").mask("000.000.000-00");

  return (
    <>
      <div className="w-full">
        <fieldset
          className={`bg-gray-300 w-[100%] h-[60px] text-sm rounded-md box-border hover:opacity-80 p-2 ${
            signUpDataError ? "border-2 border-red-700" : ""
          }`}
        >
          <legend className="bg-gray-500 text-white px-1 rounded-lg">
            {name}
          </legend>
          <input
            className="bg-gray-300 w-[100%] box-border placeholder:text-gray-500 placeholder:italic placeholder:font-roboto outline-none"
            disabled={load}
            placeholder={placeholder}
            id={name}
            type={type}
            name={id}
            value={signUpData}
            onChange={onChange}
            required
          />
        </fieldset>
        {signUpDataError ? (
          <div className="text-xs text-red-700 italic px-1">{errorMessage}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Input;

type InputParams = {
  signUpDataError: boolean;
  load: boolean;
  signUpData: string;
  errorMessage: string;
};
