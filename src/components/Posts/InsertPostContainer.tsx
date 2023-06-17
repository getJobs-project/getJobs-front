import React, { useState } from "react";
import { CiImageOn, CiLocationOn } from "react-icons/ci";

export default function InsertPostContainer({ userProfilePic }) {
  const [addImageUrl, setAddImageUrl] = useState(false);
  const [addLocalizationUrl, setAddLocalizationUrl] = useState(false);
  const [newPost, setNewPost] = useState({
    text: "",
    image: "",
    address: "",
  });

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  return (
    <div className="font-roboto text-black max-w-[450px] bg-gray-200 w-full p-5 sm:rounded-lg flex items-start gap-0 box-border">
      <img
        className="w-[10%] aspect-square object-cover rounded-full border border-black"
        src={userProfilePic}
      />
      <form className=" font-roboto text-black max-w-[450px] bg-gray-200 w-full p-2 flex flex-col items-end gap-2">
        <textarea
          className="resize-none text-clip break-words border-b max-w-[450px] border-gray-600 border-solid w-full h-20 bg-gray-200 outline-none"
          rows={3}
          cols={20}
          placeholder="What's new for today?"
          name="text"
          onChange={(e) => handleTextArea(e)}
          value={newPost.text}
          wrap="hard"
          required
        ></textarea>
        {addImageUrl ? (
          <textarea
            className="resize-none border-b max-w-[450px] border-gray-600 border-solid w-full h-8 bg-gray-200 outline-none"
            rows={1}
            cols={20}
            placeholder="Insert your image URL..."
            name="image"
            onChange={(e) => handleTextArea(e)}
            value={newPost.image}
            wrap="off"
            required
          ></textarea>
        ) : (
          <></>
        )}
        {addLocalizationUrl ? (
          <textarea
            className="resize-none border-b max-w-[450px] border-gray-600 border-solid w-full h-8 bg-gray-200 outline-none"
            rows={1}
            cols={20}
            placeholder="Insert adress here..."
            name="address"
            onChange={(e) => handleTextArea(e)}
            value={newPost.address}
            wrap="off"
            required
          ></textarea>
        ) : (
          <></>
        )}
        <div className="w-full flex justify-between">
          <div className="w-full flex gap-2 text-2xl">
            <div
              onClick={() => setAddImageUrl(true)}
              className="relative group hover:bg-gray-300 rounded-lg h-[25px]"
            >
              <CiImageOn className="cursor-pointer" />
              <span className="absolute group-hover:visible invisible w-[55px] h-[25px] bg-gray-400 text-[10px] flex justify-center items-center rounded-lg top-[30px] left-[-15px]">
                Add Image
              </span>
            </div>
            <div
              onClick={() => setAddLocalizationUrl(true)}
              className="relative group hover:bg-gray-300 rounded-lg h-[25px]"
            >
              <CiLocationOn className="cursor-pointer" />
              <span className="absolute group-hover:visible invisible w-[85px] h-[25px] bg-gray-400 text-[10px] flex justify-center items-center rounded-lg top-[30px] left-[-30px]">
                Add Localization
              </span>
            </div>
          </div>
          <button className="w-[75px] h-[35px] bg-red-800 rounded-xl text-gray-100">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

type Post = {
  isUserPost: boolean;
  userProfilePic: string;
  userName: string;
  text: string;
  img: string;
};
