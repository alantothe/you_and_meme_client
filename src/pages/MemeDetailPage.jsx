import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts.js";
// import { getUserById } from "../api/users.js";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import { Typography } from "@material-tailwind/react";

function MemeDetailPage() {
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsToggle, setCommentsToggle] = useState(false);
  const [username, setUsername] = useState();
  const { postId } = useParams();

  useEffect(() => {
    getPost();
    // getUsername();
  }, [commentsToggle]);

  const getPost = async () => {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const allComments = fetchedPost.comments;
    setComments(sortComments(allComments));
  };

  // const getUsername = async () => {
  //   const fetchedUser = await getUserById(post.user);
  //   setUsername(fetchedUser.user_string);
  // };

  const sortComments = (comments) => {
    const sortedComments = comments.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    return sortedComments;
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
        {/* {username} */}
      </Typography>
      <div className="mb-4" style={{ width: "480px" }}>
        {post.meme ? (
          <img
            className="shadow-lg border-meme-gray border-2"
            style={{
              boxShadow:
                "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
            }}
            src={post.meme}
            alt="meme-photo"
          />
        ) : (
          <div className="h-screen"></div>
        )}
      </div>

      <CommentInput
        postId={postId}
        commentsToggle={commentsToggle}
        setCommentsToggle={setCommentsToggle}
      />

      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Comments comment={comment} key={index} />
        </div>
      ))}
    </div>
  );
}

export default MemeDetailPage;
