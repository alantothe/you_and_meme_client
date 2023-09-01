import React, { useState } from "react";

// const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirmation: "", // I don't think we need this in formData, just a check that password === passwordConfirmation
//   });

function CommentInput({ userId, postId }) {
  console.log(userId);
  console.log(postId);

  const [inputData, setInputData] = useState({
    user: userId,
    post: postId,
    body: "",
  });
  return (
    <div>
      <form>
        <input type="text" placeholder="Add a comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentInput;
