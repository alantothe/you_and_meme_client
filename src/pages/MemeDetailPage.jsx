import React from "react";
import { memes } from "../assets/templates.js";
import DetailComponent from "../components/DetailComponent.jsx";



function MemeDetailPage() {



  const onePost = {
    user: "userDan",
    meme: "https://i.imgflip.com/7x2oxo.jpg",
    likes: 4,
    id: 1,
  };

  const comments = [
    { user: "userRebekah", post_id: 1, comment: "This is a comment" },
    { user: "userKyle", post_id: 1, comment: "This is another comment" },
  ];


  return (
    <div>
      <h1>Meme Detail Page</h1>
      <DetailComponent onePost={onePost} comments={comments} />
    </div>
  );
}

export default MemeDetailPage;
