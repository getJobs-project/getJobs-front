import React from "react";

import PostContainer from "../../../components/Posts/PostContainer";
import InsertPostContainer from "../../../components/Posts/InsertPostContainer";

export default function Feed() {
  document.title = `getJobs - Feed`;

  const { user } = JSON.parse(window.localStorage.getItem("userData"));

  return (
    <div className="text-white select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center box-border">
      <div className="bg-gray-800 z-10 fixed top-0 left-0 w-full flex justify-center items-center h-[50px] sm:hidden text-center text-white">
        <h1 className="font-title font-bold text-3xl ">getJobs</h1>
      </div>
      <main className="z-0 select-none h-[100vh] gap-1 min-w-full bg-gray-800 flex justify-center sm:my-[5px] box-border">
        <div className="hidden h-[100vh] max-w-[200px] min-w-[170px] w-[100%] sm:flex flex-col rounded-lg box-border p-5">
          <h1 className="font-title font-bold text-3xl">getJobs</h1>
          <div>
            <h1 className="font-roboto font-bold text-2xl">Feed</h1>
            <h1 className="font-roboto font-bold text-2xl">Profile</h1>
            <h1 className="font-roboto font-bold text-2xl">Settings</h1>
          </div>
        </div>
        <div className="h-[100vh] max-w-[850px] min-w-[370px] flex flex-col items-center md:w-2/4 gap-3 sm:rounded-lg box-border w-full sm:py-5 py-[55px] overflow-y-scroll no-scrollbar">
          <InsertPostContainer
            userProfilePic={
              "https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg"
            }
          />
          <PostContainer
            isUserPost={user.id === 7}
            userProfilePic={
              "https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg"
            }
            userName="Andre"
            text="Preciso de uma pessoa pra aplicar esse tipo de finalização na parede do meu quarto, são 4 paredes em um quarto com 20m2"
            img={
              "https://img.freepik.com/fotos-gratis/fundo-branco-das-texturas-da-parede-de-tijolo_1203-6587.jpg"
            }
            address="Asa Norte Brasilia DF"
          />
          <PostContainer
            isUserPost={user.id === 9}
            userProfilePic={
              "https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg"
            }
            userName="Outro usuario"
            text="Preciso de uma pessoa pra aplicar esse tipo de finalização na parede do meu quarto, são 4 paredes em um quarto com 20m2"
            img={
              "https://img.freepik.com/fotos-gratis/fundo-branco-das-texturas-da-parede-de-tijolo_1203-6587.jpg"
            }
            address="Brasilia DF"
          />
        </div>
        <div className="hidden h-[100vh] max-w-[200px] min-w-[170px] w-[100%] md:flex flex-col rounded-lg box-border p-5">
          <input placeholder="Buscar em posts" />
          Explorar
        </div>
      </main>
      <div className="bg-gray-800 z-10 fixed bottom-0 left-0 w-full flex justify-center items-center h-[50px] sm:hidden text-center text-white">
        <h1 className="font-title font-bold text-3xl ">Menu para celular</h1>
      </div>
    </div>
  );
}
