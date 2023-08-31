import React, { useState, useEffect } from "react";
import { getPostsByUser } from "../api/api";
import SmallPostDetail from "../components/SmallPostDetail.jsx";

function ProfilePage() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    // the user id is hardcoded for now, we need to pass down the user id app.js after token is verified
    const posts = await getPostsByUser(3);
    setAllPosts(posts);
    console.log(posts.posts.meme);
  }

  return (
    <div>
      <div>
        <h1>Profile Page</h1>
      </div>
      {/* <div>
        {allPosts.meme.map((allPosts, index) => (
          <SmallPostDetail allPosts={allPosts} key={index} />
        ))}
      </div> */}
    </div>
  );
}

export default ProfilePage;
