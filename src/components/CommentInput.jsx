import React, { useState } from "react";
import { createComment } from "../api/comments";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

function CommentInput({ postId }) {
  const userId = useSelector((state) => state.user.userId);

  const [inputData, setInputData] = useState({
    user: userId,
    post: parseInt(postId),
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePost = () => {
    // event.preventDefault();
    console.log("Comment submitted:", inputData);
    createComment(inputData);
    // After logging the data, you might want to clear the input.
    // setInputData((prevData) => ({
    //   ...prevData,
    //   body: "",
    // }));
    console.log("Comment submitted:", inputData);
    window.location.reload();
  };

  return (
    <div className="flex" style={{ width: "480px" }}>
      <input
        className="flex grow pl-2"
        type="text"
        name="body" // <-- This 'name' attribute is crucial for the handleChange function
        value={inputData.body}
        onChange={handleChange}
        placeholder="Add a comment..."
      />
      <Typography
        className="justify-end text-yellow-400 ml-2 cursor-pointer"
        onClick={handlePost}
      >
        Post
      </Typography>
    </div>
  );
}

export default CommentInput;
