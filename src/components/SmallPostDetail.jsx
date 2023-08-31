import React from "react";

function SmallPostDetail({ allPosts }) {
  console.log(allPosts.meme)

  return (
  <div className="w-60 h-60 p-4 shadow-lg rounded-lg cursor-pointer bg-gray-400">
    <div className="flex flex-col items-center justify-around h-full w-full">
    <img className="w-60 h-60 mt-4 rounded-lg" src={allPosts.meme} />
        <p className="text-2xl font-bold text-blue-900">
          {/* src={allPosts.meme} /> */}
          </p>
      </div>
  </div>
  )

}

export default SmallPostDetail;
