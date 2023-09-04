import { useState, useEffect, createElement, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../api/users.js";
import { Typography, Avatar } from "@material-tailwind/react";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
  fetchUserById,
} from "../redux/features/user/userThunks.js";

function HomePostDetail({ allPosts }) {
  const entireUser = useSelector((state) => state.user?.entireUser);
  const userId = entireUser?.user;
  const likesRef = useRef(allPosts.likes);

  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(allPosts.likes);

  const initialToggle = entireUser?.likedPosts?.includes(allPosts.id) || false;
  // Check if this post is in the user's likedPosts array to determine the initial toggle state
  const [likesToggle, setLikesToggle] = useState(initialToggle);

  const dispatch = useDispatch();

  const toggleLike = () => {
    if (!allPosts?.id || !userId) return;

    // If not currently liked, like the post.
    if (!likesToggle) {
      console.log("toggleLike called");
      setLikes((prevLikes) => prevLikes + 1);
      setLikesToggle(true);
      dispatch(add1Like(allPosts.id));
      dispatch(thunkAddUserLikedPosts({ postId: allPosts.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
    // If currently liked, unlike the post.
    else {
      console.log("toggleUnlike called");
      setLikes((prevLikes) => prevLikes - 1);
      setLikesToggle(false);
      dispatch(minus1Like(allPosts.id));
      dispatch(
        thunkRemoveUserLikedPosts({ postId: allPosts.id, userId: userId })
      );
      dispatch(fetchUserById(userId));
    }
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

  return (
    <div className="my-4">
      <div
        className="w-80 mx-4 mb-4 mt-2 shadow-lg border-gray-700 border-2 xs:w-screen overflow-hidden"
        style={{
          width: "600px",
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
      >
        <div className="flex justify-between items-center pl-2 py-3">
          <div className="flex items-center cursor-pointer">
            {user && user.avatar ? (
              <Avatar src={user.avatar} round={true} size="40" />
            ) : null}

            <Typography className="font-black pl-2">
              {user.user_string}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center m-0 p-0">
          <img
            className="m-0 p-0"
            src={allPosts.meme}
            style={{
              width: "600px",
              height: "auto", // Keep aspect ratio
              objectFit: "contain",
            }}
          />
        </div>
        <div className="px-4 flex justify-between items-center">
          <div className="flex items-center py-5 ">
            {!likesToggle
              ? createElement(HeartIcon, {
                  className: "h-7 w-7 mr-2 text-yellow-400 cursor-pointer",
                  strokeWidth: 2,
                  onClick: toggleLike,
                })
              : createElement(HeartIconSolid, {
                  className: "h-7 w-7 mr-2 text-red-500 cursor-pointer",
                  strokeWidth: 2,
                  onClick: toggleLike,
                })}
          </div>
          {/* <Typography>{formatTimestamp(allPosts.created)}</Typography> */}
          <Typography className="font-black">
            {likes} {likes !== 1 ? "likes" : "like"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default HomePostDetail;
