import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";

import logo from "../../assets/favicon-32x32.png";

export default function SideBar() {
  const userName = "andre";
  const navigate = useNavigate();
  return (
    <>
      <div className="md:border-r md:border-gray-950 hidden h-[100vh] max-w-[200px] min-w-[100px] w-[100%] sm:flex flex-col box-border gap-4 p-5">
        <span className="cursor-pointer hover:opacity-70 text-gray-200 flex gap-2 items-center font-title text-3xl">
          <img
            className="rounded-md w-10 h-10 text-sm"
            src={logo}
            alt="Logo Image"
          />
          getJobs
        </span>
        <div className="flex flex-col gap-1 text-gray-200">
          <span
            onClick={() => navigate("/main/feed")}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineHome /> Home
          </span>
          <span
            onClick={() => navigate(`/main/${userName}`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineUser /> Profile
          </span>
          <span
            onClick={() => navigate(`/main/search`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineSearch /> Explore
          </span>
          <span
            onClick={() => navigate(`/main/settings`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineSetting /> Settings
          </span>
        </div>
      </div>
    </>
  );
}
