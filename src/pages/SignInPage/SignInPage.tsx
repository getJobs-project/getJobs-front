import React from "react";

function SignInPage(): JSX.Element {
  return (
    <>
      <main className="bg-black h-screen flex flex-col justify-center align-center">
        <div>getJobs</div>
        <div className="flex flex-col gap-10">
          <input className="w-0.5" placeholder="email" />
          <input placeholder="senha" />
          <button className="bg-red-500">Entrar</button>
        </div>
      </main>
    </>
  );
}

export default SignInPage;
