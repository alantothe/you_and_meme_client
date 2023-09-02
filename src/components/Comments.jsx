import React, { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { getUserById } from "../api/users.js";

function Comments({ comment }) {
  const avatarIdentifier = comment.email || comment.id;
  const config = genConfig(avatarIdentifier);

  // fetch user by id
  const [user, setUser] = useState({});
  console.log(user.user_string);

  useEffect(() => {
    fetchUsername();
  }, []);
  async function fetchUsername() {
    const userId = await getUserById(comment.user);
    setUser(userId);
  }

  const formatDate = (timestamp) => {
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

    const date = timestamp.split("T")[0];
    const time = timestamp.split("T")[1].split(".")[0];

    const year = date.split("-")[0];
    const month = months[parseInt(date.split("-")[1], 10) - 1];
    const day = parseInt(date.split("-")[2], 10);

    return `${month} ${day}, ${year}, ${time}`;
  };

  return (
    <div>
      <h1>{user ? user.user_string : null}</h1>
      <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
      <p>{comment.body}</p>
      <p>{formatDate(comment.updated_at)}</p>
    </div>
  );
}

export default Comments;
