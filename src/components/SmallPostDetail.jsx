import { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updatePostByLikes, deletePost } from "../api/api";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import "./styles.css";

function SmallPostDetail({ allPosts }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(0);
  const [likesToggle, setLikesToggle] = useState(false);

  useEffect(() => {
    fetchUser();
    setLikes(allPosts.likes);
  }, []);

  const fetchUser = async () => {
    const fetchedUser = await getUserById(allPosts.user);
    setUser(fetchedUser);
  };

  const updateLikes = async () => {
    if (likesToggle === false) {
      await updatePostByLikes(allPosts.id, likes + 1);
      setLikes(likes + 1);
      setLikesToggle(true);
    } else {
      await updatePostByLikes(allPosts.id, likes - 1);
      setLikes(likes - 1);
      setLikesToggle(false);
    }
  };

  const deletePostById = async () => {
    await deletePost(allPosts.id);
    window.location.reload();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (parseInt(hours) === 0) {
      return `${month}/${day}/${year} 12:${minutes}AM`;
    } else if (parseInt(hours) < 12) {
      return `${month}/${day}/${year} ${hours}:${minutes}AM`;
    } else if (parseInt(hours) === 12) {
      return `${month}/${day}/${year} 12:${minutes}PM`;
    } else {
      return `${month}/${day}/${year} ${hours - 12}:${minutes}PM`;
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center px-4">
        <Typography>{user.user_string}</Typography>
        <button className="text-meme-teal" onClick={deletePostById}>
          X
        </button>
      </div>

      <div
        className="w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg cursor-pointer border-meme-teal border-4 xs:w-screen xs:h-auto"
        style={{
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
        onClick={() => {
          navigate(`/meme-detail-page/${allPosts.id}`);
        }}
      >
        <div className="flex flex-col items-center justify-around h-full w-full">
          <img className="object-contain w-full h-full" src={allPosts.meme} />
        </div>
      </div>
      <div className="px-4 flex justify-between items-center">
        <div className="flex items-center">
          {!likesToggle
            ? createElement(HeartIcon, {
                className: "h-5 w-5 mr-2 text-yellow-400 cursor-pointer",
                strokeWidth: 2,
                onClick: updateLikes,
              })
            : createElement(HeartIconSolid, {
                className: "h-5 w-5 mr-2 text-red-500 cursor-pointer",
                strokeWidth: 2,
                onClick: updateLikes,
              })}
          <Typography>
            {likes} {likes !== 1 ? "likes" : "like"}
          </Typography>
        </div>
        <Typography>{formatTimestamp(allPosts.created)}</Typography>
      </div>
    </div>
  );
}

export default SmallPostDetail;
