import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import SideBar from "../../../components/SideBar";
import PostContainer from "../../../components/Posts/PostContainer";
import InsertPostContainer from "../../../components/Posts/InsertPostContainer";
import MenuBar from "../../../components/Mobile/MenuBar";
import { getMorePosts, getPosts } from "../../../services/postsAPI";
import useToken from "../../../hooks/useToken";
import { Post } from "../../../utils/posts";
import InnerLoad from "../../../components/Loading/InnerLoad";
import { post } from "jquery";

export default function Feed() {
  document.title = `getJobs - Home`;
  const token = useToken();
  const { user } = JSON.parse(window.localStorage.getItem("userData"));

  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [reload, setReload] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoad(true);
    getPosts(token)
      .then((res) => setPosts(res))
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  }, [reload]);

  function listPosts(e: Post): React.JSX.Element {
    return (
      <PostContainer
        key={e.id}
        isUserPost={user.id === e.userId}
        userProfilePic={e.User.profilePicture}
        userName={e.User.userName}
        text={e.text}
        img={e.imageUrl}
        address={e.location}
      />
    );
  }

  function fetchData() {
    if (posts.length < 1) return;
    getMorePosts(token, posts[posts.length - 1].createdAt)
      .then((res) => {
        if (res.length < 1) setHasMore(false);
        setPosts(posts.concat(res));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  }

  return (
    <div className="text-white select-none min-h-[100vh] min-w-full bg-gray-800 flex flex-col justify-center box-border">
      <header className="bg-gray-800 z-10 fixed top-0 left-0 w-full flex justify-center items-center h-[50px] sm:hidden text-center text-white">
        <h1 className="font-title font-bold text-3xl ">getJobs</h1>
      </header>
      <main className="z-0 select-none h-[100vh] md:gap-1 min-w-full bg-gray-800 flex justify-between sm:my-[5px] box-border">
        <SideBar />
        <div className="h-[100vh] min-w-[370px] flex flex-col items-center md:w-2/4 gap-3 sm:rounded-lg box-border w-full sm:py-5 py-[55px] overflow-y-scroll no-scrollbar">
          <InsertPostContainer
            reload={reload}
            setReload={setReload}
            userProfilePic={user.profilePicture}
          />
          <InfiniteScroll
            className="flex flex-col items-center gap-3 sm:rounded-lg box-border w-full sm:py-5 py-[55px] overflow-y-scroll no-scrollbar"
            dataLength={posts.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<InnerLoad height={30} />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts.map((e) => listPosts(e))}
          </InfiniteScroll>
        </div>
        <div className="hidden h-[100vh] max-w-[200px] min-w-[170px] w-[100%] md:flex flex-col rounded-lg box-border p-5">
          <input placeholder="Buscar em posts" />
          Explorar
        </div>
      </main>
      <MenuBar />
    </div>
  );
}
