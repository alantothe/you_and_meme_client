import React, { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { getUserById } from "../api/users.js";
import { deleteComment } from "../api/comments.js";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

function Comments({ comment }) {
  const avatarIdentifier = comment.email || comment.id;
  const config = genConfig(avatarIdentifier);
  const userId = useSelector((state) => state.user.userId);

  const [user, setUser] = useState({});
  console.log(user.user_string);

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    const userId = await getUserById(comment.user);
    setUser(userId);
  };

  const deleteCommentById = async () => {
    await deleteComment(comment.id);
    window.location.reload();
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
    <div className="mt-4" style={{ width: "480px" }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-2" {...config} />
          <Typography className="text-yellow-400">
            {user.user_string}
          </Typography>
        </div>
        {userId === comment.user ? (
          <button onClick={deleteCommentById}>X</button>
        ) : null}
      </div>
      <Typography className="text-white ml-10">{comment.body}</Typography>
      <Typography variant="small" className="text-yellow-400 text-right">
        {formatTimestamp(comment.updated_at)}
      </Typography>
    </div>
  );
}

export default Comments;
