import { useState, useEffect, createElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts.js";
import { getUserById } from "../api/users.js";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Avatar } from "@material-tailwind/react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import {
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
  fetchUserById,
} from "../redux/features/user/userThunks.js";

function MemeDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const entireUser = useSelector((state) => state.user?.entireUser);
  dispatch(fetchUserById(entireUser?.id));
  const [post, setPost] = useState({});
  const initialToggle = entireUser?.likedPosts?.includes(post.id) || false;
  const [likesToggle, setLikesToggle] = useState(false);

  const [likes, setLikes] = useState(() => post.likes || 0);
  const [user, setUser] = useState({});
  const [userAvatar, setUserAvatar] = useState({});
  const [commentsToggle, setCommentsToggle] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    getPostAndUser();
  }, [commentsToggle]);

  useEffect(() => {
    setLikes(post.likes || 0);
  }, [post.likes]);

  const userId = entireUser?.user; // The logged in user's id

  // Check if this post is in the user's likedPosts array to determine the initial toggle state

  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState();

  const getPostAndUser = async () => {
    dispatch(fetchUserById(userId));
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const initialToggle =
      entireUser?.likedPosts?.includes(fetchedPost.id) || false;
    setLikesToggle(initialToggle);

    const allComments = fetchedPost.comments;
    setComments(sortComments(allComments));
    const fetchedUser = await getUserById(fetchedPost.user);
    setUserAvatar(fetchedUser);
  };

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
      setLikes((prevLikes) => prevLikes + 1);
      setLikesToggle(true);
      dispatch(add1Like(post.id));
      dispatch(thunkAddUserLikedPosts({ postId: post.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
    // If currently liked, unlike the post.
    else {
      setLikes((prevLikes) => prevLikes - 1);
      setLikesToggle(false);
      dispatch(minus1Like(post.id));
      dispatch(thunkRemoveUserLikedPosts({ postId: post.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (hours === 0) {
      return `${months[month]} ${day}, ${year} at ${hours + 12}:${minutes}AM`;
    } else if (hours < 12) {
      return `${months[month]} ${day}, ${year} at ${hours}:${minutes}AM`;
    } else if (hours === 12) {
      return `${months[month]} ${day}, ${year} at ${hours}:${minutes}PM`;
    } else {
      return `${months[month]} ${day}, ${year} at ${hours - 12}:${minutes}PM`;
    }
  };

  return (
    <div className="flex flex-col mx-auto m-4" style={{ width: "480px" }}>
      <div className="pl-2 py-3 flex items-center hover:opacity-50">
        {userAvatar ? (
          <Avatar
            className="cursor-pointer border-x border-y border-yellow-400"
            src={userAvatar.avatar}
            round={true}
            size="40"
            onClick={navToProfile}
          />
        ) : null}
        {userAvatar ? (
          <Typography
            className="font-black pl-2 cursor-pointer text-yellow-400"
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

          {createElement(ShareIcon, {
            className:
              "h-7 w-7 mr-2 text-yellow-400 cursor-pointer hover:opacity-50",
            strokeWidth: 2,
            onClick: () => {
              navigate("/development");
            },
          })}
        </div>

        <Typography className="font-black">
          {likes} {likes !== 1 ? "likes" : "like"}
        </Typography>
      </div>

      <div className="flex justify-end">
        <Typography className="text-yellow-400 text-xs">
          {formatTimestamp(post.created)}
        </Typography>
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
