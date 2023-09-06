import "./styles.css";
import { useState, useEffect, createElement, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../api/users.js";
import { Typography, Avatar } from "@material-tailwind/react";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
  fetchUserById,
} from "../redux/features/user/userThunks.js";
import { useNavigate } from "react-router-dom";

function HomePostDetail({
  allPosts,
  userToken,
  mobileView,
  handleResize,
  formatTimestamp,
}) {
  const entireUser = useSelector((state) => state.user?.entireUser);
  const userId = entireUser?.user;
  const likesRef = useRef(allPosts.likes);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(allPosts.likes);

  const initialToggle = entireUser?.likedPosts?.includes(allPosts.id) || false;
  // Check if this post is in the user's likedPosts array to determine the initial toggle state
  const [likesToggle, setLikesToggle] = useState(initialToggle);

  const dispatch = useDispatch();

  const toggleLike = () => {
    if (!userToken) {
      navigate("/sign-in");
      return;
    }

    // If not currently liked, like the post
    if (!likesToggle) {
      setLikes((prevLikes) => prevLikes + 1);
      setLikesToggle(true);
      dispatch(add1Like(allPosts.id));
      dispatch(thunkAddUserLikedPosts({ postId: allPosts.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
    // If currently liked, unlike the post
    else {
      setLikes((prevLikes) => prevLikes - 1);
      setLikesToggle(false);
      dispatch(minus1Like(allPosts.id));
      dispatch(
        thunkRemoveUserLikedPosts({ postId: allPosts.id, userId: userId })
      );
      dispatch(fetchUserById(userId));
    }
  };
  const navToProfile = () => {
    navigate(`/profile/${allPosts.user}`);
  };

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUserById(allPosts.user);
      setUser(fetchedUser);
    }

    if (allPosts?.user) {
      fetchUser();
    }

    // We can synchronize the ref's value with allPosts.likes
    likesRef.current = allPosts.likes;
  }, [allPosts.user, likesToggle]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center my-4 w-screen">
      <div
        className="mx-4 mb-4 mt-2 shadow-lg border-meme-gray border-2 overflow-hidden"
        style={{
          width: mobileView ? "90vw" : "33vw",
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
      >
        <div className="flex justify-between items-center pl-2 py-3">
          <div className="flex items-center hover:opacity-50">
            {user && user.avatar ? (
              <Avatar
                className="cursor-pointer border-x border-y border-yellow-400"
                src={user.avatar}
                round={true}
                onClick={navToProfile}
              />
            ) : null}
            <Typography
              className="font-black pl-2 cursor-pointer"
              onClick={navToProfile}
            >
              {user.user_string}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-center m-0 p-0 cursor-pointer">
          <img
            className="m-0 p-0 w-full"
            src={allPosts.meme}
            onClick={() => {
              navigate(`/meme-detail-page/${allPosts.id}`);
            }}
          />
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
            {createElement(ChatBubbleOvalLeftEllipsisIcon, {
              className:
                "h-7 w-7 mr-2 text-yellow-400 cursor-pointer hover:opacity-50",
              strokeWidth: 2,
              onClick: () => {
                navigate(`/meme-detail-page/${allPosts.id}`);
              },
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
        <div className="flex justify-between pr-4">
          {allPosts.comments.length === 0 ? (
            <div className="pl-4 pb-4">
              <span
                onClick={() => navigate(`/meme-detail-page/${allPosts.id}`)}
                className="cursor-pointer font-thin hover:opacity-50"
              >
                No comments
              </span>
            </div>
          ) : null}
          {allPosts.comments.length === 1 ? (
            <div className="pl-4 pb-4">
              <span
                onClick={() => navigate(`/meme-detail-page/${allPosts.id}`)}
                className="cursor-pointer font-thin hover:opacity-50"
              >
                View 1 comment
              </span>
            </div>
          ) : null}
          {allPosts.comments.length > 1 ? (
            <div className="pl-4 pb-4">
              <span
                onClick={() => navigate(`/meme-detail-page/${allPosts.id}`)}
                className="cursor-pointer font-thin hover:opacity-50"
              >{`View all ${allPosts.comments.length} comments`}</span>
            </div>
          ) : null}
          <Typography>{formatTimestamp(allPosts.created)}</Typography>
        </div>
      </div>
    </div>
  );
}

export default HomePostDetail;
