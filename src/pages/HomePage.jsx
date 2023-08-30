import React, { useEffect, useState } from "react";
import { getPosts } from "../api/memeApi/api";

function HomePage() {
  // const [allPost, setAllPost] = useState(null);
  // useEffect(() => {
  //   fetchPost();
  // }, []);
  // async function fetchPost() {
  //   const posts = await getPosts();
  //   setAllPost(posts);
  // }
  // console.log(allPost);
  // return (
  //   <div>
  //     <h1>Home Page</h1>
  //   </div>
  // );

  return (
    <div>
      <h1>Home Page </h1>
    </div>
  );
}

export default HomePage;
