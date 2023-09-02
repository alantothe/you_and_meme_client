import React, { useState } from "react";
import { createComment } from "../api/comments";

function CommentInput({ userId, postId }) {
  console.log("userID " + userId);
  console.log(typeof postId);
  console.log(typeof userId);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Comment submitted:", inputData);
    createComment(inputData);
    // After logging the data, you might want to clear the input.
    setInputData((prevData) => ({
      ...prevData,
      body: "",
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="body" // <-- This 'name' attribute is crucial for the handleChange function
          value={inputData.body}
          onChange={handleChange}
          placeholder="Add a comment..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentInput;
