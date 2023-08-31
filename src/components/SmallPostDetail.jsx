import React from "react";

function SmallPostDetail({ allPosts }) {
  console.log(allPosts.meme)

  return (
    <div className=" w-60 h-60 relative">
      <img className="absolute top-0 left-0 w-full h-full object-contain"
      src={allPosts.meme} />
    </div>
  )

}

export default SmallPostDetail;
