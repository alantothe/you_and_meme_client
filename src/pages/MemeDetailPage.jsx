import { useState, useEffect, createElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts.js";
import { getUserById } from "../api/users.js";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import { useSelector, useDispatch } from "react-redux";
import { Typography, avatar } from "@material-tailwind/react";

import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import Avatar from "react-avatar";

import {
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
  fetchUserById,
} from "../redux/features/user/userThunks.js";

function MemeDetailPage() {
  const entireUser = useSelector((state) => state.user?.entireUser);
  const [post, setPost] = useState({});
  console.log(entireUser.id);
  const initialToggle = entireUser?.likedPosts?.includes(post.id) || false;
  const [likesToggle, setLikesToggle] = useState(initialToggle);
  const [likes, setLikes] = useState(() => post.likes || 0);
  useEffect(() => {
    getPostAndUser();
  }, []);

  useEffect(() => {
    setLikes(post.likes || 0);
  }, [post.likes]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userId = entireUser?.user; // The logged in user's id

  // Check if this post is in the user's likedPosts array to determine the initial toggle state

  const [user, setUser] = useState({});

  console.log(post);
  //---------
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState();
  const { postId } = useParams();
  const [userAvatar, setUserAvatar] = useState();

  const getPostAndUser = async () => {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    console.log(fetchedPost);
    const allComments = fetchedPost.comments;
    setComments(sortComments(allComments));
    const fetchedUser = await getUserById(fetchedPost.user);
    setUserAvatar(fetchedUser);
    console.log(fetchedUser);
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

  const toggleLike = () => {
    if (!post?.id || !userId) return;

    // If not currently liked, like the post.
    if (!likesToggle) {
      console.log("toggleLike called");
      setLikes((prevLikes) => prevLikes + 1);
      setLikesToggle(true);
      dispatch(add1Like(post.id));
      dispatch(thunkAddUserLikedPosts({ postId: post.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
    // If currently liked, unlike the post.
    else {
      console.log("toggleUnlike called");
      setLikes((prevLikes) => prevLikes - 1);
      setLikesToggle(false);
      dispatch(minus1Like(post.id));
      dispatch(thunkRemoveUserLikedPosts({ postId: post.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
  };

  return (
    <div
      className="flex flex-col mx-auto justify-center items-center m-4"
      style={{ width: "480px" }}
    >
      <div className="flex ">
        {userAvatar ? (
          <Avatar
            className="cursor-pointer"
            src={userAvatar.avatar}
            round={true}
            size="40"
            onClick={navToProfile}
          />
        ) : null}
        {userAvatar ? (
          <Typography
            className="font-black pl-2 cursor-pointer"
            onClick={navToProfile}
          >
            {userAvatar.user_string}
          </Typography>
        ) : null}
      </div>

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

      <div className="px-4 flex justify-between items-center">
        <div className="flex items-center py-5 ">
          {!likesToggle
            ? createElement(HeartIcon, {
                className:
                  "h-7 w-7 mr-2 text-yellow-400 cursor-pointer hover:opacity-50",
                strokeWidth: 2,
                onClick: toggleLike,
              })
            : createElement(HeartIconSolid, {
                className:
                  "h-7 w-7 mr-2 text-red-500 cursor-pointer hover:opacity-50",
                strokeWidth: 2,
                onClick: toggleLike,
              })}
        </div>

        {/* <Typography>{formatTimestamp(allPosts.created)}</Typography> */}

        <Typography className="font-black">
          {likes} {likes !== 1 ? "likes" : "like"}
        </Typography>
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
