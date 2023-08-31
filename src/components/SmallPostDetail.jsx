import React from "react";

function SmallPostDetail({ allPosts }) {
  console.log(allPosts.meme)

  return (
    <div className="w-60 h-60 p-4 m-4 shadow-lg rounded-lg cursor-pointer bg-meme-teal"
    style={{ boxShadow: '10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)' }}>
    <div className="flex flex-col items-center justify-around h-full w-full">
    <img className="object-contain w-full h-full mt-4" src={allPosts.meme} />
      </div>
  </div>
  )

}

export default SmallPostDetail;
