import InnerLoad from "../../Loading/InnerLoad";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { createPost } from "../../../services/postsAPI";
import useToken from "../../../hooks/useToken";

export default function InsertPostContainer({
  userProfilePic,
  setReload,
  reload,
}: {
  userProfilePic: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}) {
  const token = useToken();
  const [load, setLoad] = useState(false);
  const [addImageUrl, setAddImageUrl] = useState(false);
  const [addLocationUrl, setAddLocationUrl] = useState(false);
  const clearPost = {
    text: "",
    location: "",
    imageUrl: "",
  };
  const [newPost, setNewPost] = useState(clearPost);

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  function clearArea(type: "imageUrl" | "location") {
    if (type === "imageUrl") setAddImageUrl(false);
    if (type === "location") setAddLocationUrl(false);
    setNewPost({ ...newPost, [type]: "" });
  }

  function post(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoad(true);
    createPost(token, newPost)
      .then(() => {
        setLoad(false);
        setReload(!reload);
        setNewPost(clearPost);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="font-roboto text-black max-w-[550px] bg-gray-200 w-full p-5 sm:rounded-lg flex items-start gap-0 box-border">
      <img
        className="w-[10%] aspect-square object-cover rounded-full border border-black"
        src={userProfilePic}
      />
      <form
        onSubmit={post}
        className=" font-roboto text-black max-w-[450px] bg-gray-200 w-full p-2 flex flex-col items-end gap-2"
      >
        <textarea
          className="resize-none text-clip break-words border-b max-w-[450px] border-gray-600 border-solid w-full h-20 bg-gray-200 outline-none"
          rows={3}
          cols={20}
          placeholder="What's new for today?"
          name="text"
          onChange={(e) => handleTextArea(e)}
          value={newPost.text}
          wrap="hard"
          disabled={load}
          required
        ></textarea>

        {addImageUrl ? (
          <div className="flex items-center gap-2 border-b max-w-[450px] border-gray-600 border-solid w-full h-8 outline-none">
            <textarea
              className="resize-none w-full bg-gray-200 outline-none"
              rows={1}
              cols={20}
              placeholder="Insert your image URL..."
              name="imageUrl"
              onChange={(e) => handleTextArea(e)}
              value={newPost.imageUrl}
              wrap="off"
              disabled={load}
              required
            ></textarea>
            <AiOutlineClose
              name="imageUrl"
              onClick={() => clearArea("imageUrl")}
              className="text-xl cursor-pointer rounded-xl hover:bg-gray-300"
            />
          </div>
        ) : (
          <></>
        )}
        {addLocationUrl ? (
          <div className="flex items-center gap-2 border-b max-w-[450px] border-gray-600 border-solid w-full h-8 outline-none">
            <textarea
              className="resize-none w-full bg-gray-200 outline-none"
              rows={1}
              cols={20}
              placeholder="Insert adress here..."
              name="location"
              onChange={(e) => handleTextArea(e)}
              value={newPost.location}
              wrap="off"
              disabled={load}
              required
            ></textarea>
            <AiOutlineClose
              name="location"
              onClick={() => clearArea("location")}
              className="text-xl cursor-pointer rounded-xl hover:bg-gray-300"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex gap-2 text-2xl">
            <div
              onClick={() => {
                if (!load) setAddImageUrl(true);
              }}
              className="relative group hover:bg-gray-300 rounded-lg h-[25px]"
            >
              <CiImageOn className="cursor-pointer" />
              <span className="absolute group-hover:visible invisible w-[55px] h-[25px] bg-gray-400 text-[10px] flex justify-center items-center rounded-lg top-[30px] left-[-15px]">
                Add Image
              </span>
            </div>
            <div
              onClick={() => {
                if (!load) setAddLocationUrl(true);
              }}
              className="relative group hover:bg-gray-300 rounded-lg h-[25px]"
            >
              <CiLocationOn className="cursor-pointer" />
              <span className="absolute group-hover:visible invisible w-[85px] h-[25px] bg-gray-400 text-[10px] flex justify-center items-center rounded-lg top-[30px] left-[-30px]">
                Add Localization
              </span>
            </div>
          </div>
          <button
            disabled={load}
            className="h-[35px] text-sm bg-red-800 rounded-xl text-gray-100 p-3 flex justify-center items-center gap-1"
          >
            {load ? (
              <>
                <InnerLoad height={10} /> Posting
              </>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
