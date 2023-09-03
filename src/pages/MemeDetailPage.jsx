import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts.js";
import { getUserById } from "../api/users.js";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import { Typography } from "@material-tailwind/react";

function MemeDetailPage() {
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    getPost();
    getUsername();
  }, []);

  const getPost = async () => {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const allComments = fetchedPost.comments;
    setComments(allComments);
  };

  const getUsername = async () => {
    const fetchedUser = await getUserById(post.user);
    setUsername(fetchedUser.user_string);
  };

  const navToProfile = () => {
    navigate(`/profile/${post.user}`);
  };

  return (
    <div
      className="flex flex-col mx-auto justify-center items-center m-4"
      style={{ width: "480px" }}
    >
      <Typography
        className="flex font-black text-yellow-400 cursor-pointer"
        style={{ width: "480px" }}
        onClick={navToProfile}
      >
        {username}
      </Typography>
      <div className="mb-4" style={{ width: "480px" }}>
        <img src={post.meme} alt="meme-photo" />
      </div>

      <CommentInput postId={postId} />

      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Comments comment={comment} key={index} />
        </div>
      ))}
    </div>
  );
}

export default MemeDetailPage;
