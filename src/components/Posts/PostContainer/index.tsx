import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function PostContainer({
  isUserPost,
  userProfilePic,
  userName,
  text,
  img,
  address,
}: Post) {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const navigate = useNavigate();

  const menu = (
    <ul className="absolute top-[-10px] right-[-10px] flex flex-col items-end gap-1 p-2 box-border bg-gray-800 text-white w-[100px] rounded-md">
      <li
        className="flex text-lg w-[30px] h-[25px] items-center justify-end rounded-sm p-1 cursor-pointer"
        onClick={() => setMenuVisibility(false)}
      >
        <BiDotsHorizontalRounded />
      </li>
      {isUserPost ? (
        <li className="flex w-[80px] h-[25px] items-center justify-end rounded-sm hover:bg-gray-600 p-1 cursor-pointer">
          Delete
        </li>
      ) : (
        <li className="flex w-[80px] h-[25px] items-center justify-end rounded-sm hover:bg-gray-600 p-1 cursor-pointer">
          Report
        </li>
      )}
    </ul>
  );

  return (
    <div className="font-roboto text-gray-900 max-w-[550px] bg-gray-300 w-full p-5 sm:rounded-lg flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="w-[10%] aspect-square object-cover rounded-full border border-black cursor-pointer"
            src={userProfilePic}
            alt="Profile Pic"
            onClick={() => navigate(`/main/${userName}`)}
          />
          <h1
            onClick={() => navigate(`/main/${userName}`)}
            className="cursor-pointer"
          >
            {userName}
          </h1>
        </div>
        <div className="relative">
          <BiDotsHorizontalRounded
            className="text-lg cursor-pointer"
            onClick={() => setMenuVisibility(true)}
          />
          {menuVisibility ? menu : <></>}
        </div>
      </div>

      <p className="text-sm">{text}</p>
      {img ? (
        <div className="flex justify-center">
          <img
            className="w-[100%] aspect-square object-cover border border-black"
            src={img}
            alt="Profile Pic"
          />
        </div>
      ) : (
        <></>
      )}
      {address ? (
        <div className="text-[10px] flex gap-1 items-center">
          <CiLocationOn className="text-lg" />
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${address}`}
          >
            {address}
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

type Post = {
  isUserPost: boolean;
  userProfilePic: string;
  userName: string;
  text: string;
  img: string;
  address: string;
};
