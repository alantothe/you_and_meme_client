import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/api.js";
import SmallPostDetail from "../components/SmallPostDetail.jsx";

function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    const posts = await getAllPosts();
    setAllPosts(posts);
  }
  console.log(allPosts);

  return (
    <div className="bg-gray-800 min-h-screen">
      <h1 className="text-center p-4 mb-4 font-bold text-4xl">
        Welcome to You & Meme! 
      </h1>
      <p className="text-center mb-8 font-bold text-2xl">
        A place to share & create your favorite memes!
      </p>
      <div className="flex flex-wrap px-48 items-center justify-center">
        {allPosts.map((allPosts, index) => (
          <SmallPostDetail allPosts={allPosts} key={index} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
