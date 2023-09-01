import React, { useState } from "react";

// const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirmation: "", // I don't think we need this in formData, just a check that password === passwordConfirmation
//   });

function CommentInput({ currentUserID, postId }) {
  console.log(currentUserID);
  console.log(postId);

  const [inputData, setInputData] = useState({
    user: currentUserID,
    post: postId,
    body: "",
  });
  return <div></div>;
}

export default CommentInput;
