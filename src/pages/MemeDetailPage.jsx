import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts.js";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";

function MemeDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const allComments = fetchedPost.comments;
    setComments(allComments);
  }

  // Calculate the width and height to maintain the aspect ratio as 500x500 pixels
  const imageStyle = {
    maxWidth: "500px",
    maxHeight: "500px",
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4">
      <div className="mb-4">
        <img
          src={post.meme}
          alt="meme-photo"
          style={imageStyle} // Set a maximum size to maintain aspect ratio
        />
      </div>
      <div style={imageStyle}> {/* Apply the same width and height for the comment section */}
        <CommentInput postId={postId} imageHeight={500} /> {/* Pass a fixed height */}
      </div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          {" "}
          <Comments comment={comment} key={index} />
        </div>
      ))}
    </div>
  );
}

export default MemeDetailPage;
