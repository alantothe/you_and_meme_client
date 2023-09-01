import { useEffect, useState } from "react";
import { getAllPosts } from "../api/api.js";
import SmallPostDetail from "../components/SmallPostDetail.jsx";

const HomePage = () => {
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
    <div
      className="min-h-screen text-yellow-400"
      style={{ background: "rgb(45, 45, 45)" }}
    >
      <h1 className="text-center p-4 mb-4 font-bold text-4xl">
        Welcome to You & Meme!
      </h1>
      <p className="text-center mb-8 font-bold text-2xl">
        A place to share & create your favorite memes!
      </p>
      <div className="flex justify-center">
        <div className="flex flex-wrap px-48 items-center justify-center">
          {allPosts.map((post, index) => (
            <div>
              <SmallPostDetail allPosts={post} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
