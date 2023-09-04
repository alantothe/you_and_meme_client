import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { getUserById } from "../api/users.js";
import { deleteComment } from "../api/comments.js";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function Comments({ comment }) {
  const avatarIdentifier = comment.email || comment.id;
  const config = genConfig(avatarIdentifier);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

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

  const navToProfile = () => {
    navigate(`/profile/${comment.user}`);
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

  function DeleteCommentPopUp({ owner, deleteCommentById }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    if (!owner) return null;

    return (
      <div>
        <EllipsisHorizontalIcon
          className="h-7 w-7 mr-2 text-yellow-400 cursor-pointer"
          strokeWidth={2}
          onClick={handleOpen}
        />
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="flex justify-center">
            Are you sure you want to delete your comment?
          </DialogHeader>
          <DialogFooter>
            <Button
              className="outline-none"
              variant="gradient"
              color="red"
              onClick={() => {
                handleOpen();
                deleteCommentById();
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
  }

  return (
    <div
      className="mt-4 bg-meme-gray p-2 rounded"
      style={{ width: "480px", border: "1px solid rgb(209, 189, 4)" }}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar onClick={navToProfile} className="w-8 h-8 mr-2" {...config} />
          {/* onClick not working */}

          <Typography
            className="text-yellow-400 cursor-pointer"
            onClick={navToProfile}
          >
            {user.user_string}
          </Typography>
        </div>

        <DeleteCommentPopUp
          owner={userId === comment.user}
          deleteCommentById={deleteCommentById}
        />

        {/* {userId === comment.user ? (
          <button onClick={deleteCommentById}>X</button>
        ) : null} */}
      </div>

      <Typography className="text-white ml-10">{comment.body}</Typography>

      <Typography variant="small" className="text-yellow-400 text-right">
        {formatTimestamp(comment.updated_at)}
      </Typography>
    </div>
  );
}

export default Comments;
