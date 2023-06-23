import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlinePlusCircle,
} from "react-icons/ai";

export default function MenuBar() {
  const userName = "andre";
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-800 z-10 fixed bottom-0 left-0 w-full flex justify-center items-center h-[50px] sm:hidden text-center text-white">
        <div className="flex items-center w-full justify-between text-gray-200 px-4">
          <span
            onClick={() => navigate("/main/feed")}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineHome />
          </span>
          <span
            onClick={() => navigate(`/main/${userName}`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineUser />
          </span>
          <span
            onClick={() => navigate(`/post/`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlinePlusCircle />
          </span>
          <span
            onClick={() => navigate(`/main/search`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineSearch />
          </span>
          <span
            onClick={() => navigate(`/main/settings`)}
            className="cursor-pointer flex gap-4 items-center hover:bg-gray-700 rounded-xl w-fit p-2 font-roboto font-normal text-2xl"
          >
            <AiOutlineSetting />
          </span>
        </div>
      </div>
    </>
  );
}
