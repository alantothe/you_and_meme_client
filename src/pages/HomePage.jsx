import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/ourApi/api.js";
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
    <div>
      <h1>Home Page</h1>
      <div>
        {allPosts.map((allPosts, index) => (
          <SmallPostDetail allPosts={allPosts} key={index} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
