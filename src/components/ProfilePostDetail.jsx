import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, createElement } from "react";
import { deletePost } from "../api/posts.js";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { getUserById } from "../api/users.js";
import {
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
  fetchUserById,
} from "../redux/features/user/userThunks.js";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const DeletePostPopUp = ({ owner, deletePostById }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  if (!owner) return null;

  return (
    <div>
      <EllipsisHorizontalIcon
        className="h-7 w-7 mr-4 text-yellow-400 cursor-pointer hover:opacity-50"
        strokeWidth={2}
        onClick={handleOpen}
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center">
          Are you sure you want to delete your post?
        </DialogHeader>
        <DialogFooter>
          <Button
            className="outline-none"
            variant="gradient"
            color="red"
            onClick={() => {
              handleOpen();
              deletePostById();
            }}
          >
            Confirm
          </Button>
          <Button
            className="ml-2 outline-none"
            variant="text"
            color="black"
            onClick={handleOpen}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

function ProfilePostDetail({ allPosts, userToken, mobileView, handleResize }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const entireUser = useSelector((state) => state.user?.entireUser);
  const userId = entireUser?.user; // The logged in user's id

  const initialToggle = entireUser?.likedPosts?.includes(allPosts.id) || false;
  // Check if this post is in the user's likedPosts array to determine the initial toggle state
  const [likesToggle, setLikesToggle] = useState(initialToggle);

  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(allPosts.likes);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUser = async () => {
    const fetchedUser = await getUserById(allPosts.user);
    setUser(fetchedUser);
  };

  const deletePostById = async () => {
    await deletePost(allPosts.id);
    window.location.reload();
  };

  const toggleLike = () => {
    if (!userToken) {
      navigate("/sign-in");
      return;
    }

    // If not currently liked, like the post.
    if (!likesToggle) {
      setLikes((prevLikes) => prevLikes + 1);
      setLikesToggle(true);
      dispatch(add1Like(allPosts.id));
      dispatch(thunkAddUserLikedPosts({ postId: allPosts.id, userId: userId }));
      dispatch(fetchUserById(userId));
    }
    // If currently liked, unlike the post.
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
    <div className="my-4">
      <div
        className="mx-4 mb-4 mt-2 shadow-lg border-gray-700 border-2 overflow-hidden"
        style={{
          width: mobileView ? "90vw" : "30vw",
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
      >
        <div className="flex justify-between items-center pl-2 py-3">
          <div className="flex items-center">
            <Avatar
              className="border-x border-y border-yellow-400"
              src={user.avatar}
              round={true}
              size="sm"
            />

            <Typography className="font-black pl-2">
              {user.user_string}
            </Typography>
          </div>

          <DeletePostPopUp
            owner={userId === allPosts.user}
            deletePostById={deletePostById}
          />
        </div>

        <div className="flex flex-col items-center m-0 p-0">
          <img
            className="m-0 p-0 cursor-pointer w-full"
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

        <div className="pr-4 pb-4">
          <Typography className="flex justify-end text-xs">
            {formatTimestamp(allPosts.created)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ProfilePostDetail;
