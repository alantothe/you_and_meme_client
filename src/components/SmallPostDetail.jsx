import React from "react";

function SmallPostDetail({ allPosts }) {
  console.log(allPosts.meme)

  return (
    <div>
      {allPosts.meme}
    </div>
  )

}

export default SmallPostDetail;
