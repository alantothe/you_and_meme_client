import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { getUserById } from "../api/users.js";
import { deleteComment } from "../api/comments.js";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function Comments({ comment }) {
  const userId = useSelector((state) => state.user.entireUser?.user);
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

  function DeleteCommentPopUp({ owner, deleteCommentById, commentBody }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    if (!owner) return null;

    return (
      <div>
        <EllipsisHorizontalIcon
          className="h-7 w-7 mr-2 text-yellow-400 cursor-pointer hover:opacity-50"
          strokeWidth={2}
          onClick={handleOpen}
        />
        <Dialog className="bg-meme-gray" open={open} handler={handleOpen}>
          <DialogHeader className="flex text-center text-white">
            Are you sure you want to delete your comment?
          </DialogHeader>

          <DialogBody className="text-white">{`" ${commentBody} "`}</DialogBody>

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
      className="mt-4 bg-dark-meme-gray p-2 rounded"
      style={{
        width: "480px",
        border: "1px solid rgb(86, 86, 86)",
        boxShadow:
          "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center hover:opacity-50">
          <Avatar
            onClick={navToProfile}
            className="w-8 h-8 mr-2 cursor-pointer"
            src={user.avatar}
            round={true}
            size="40"
          />
          {/* onClick not working */}

          <Typography
            className="text-yellow-400 cursor-pointer font-black"
            onClick={navToProfile}
          >
            {user.user_string}
          </Typography>
        </div>

        <DeleteCommentPopUp
          owner={userId === comment.user}
          deleteCommentById={deleteCommentById}
          commentBody={comment.body}
        />
      </div>

      <Typography className="text-white ml-10">{comment.body}</Typography>

      <Typography className="text-yellow-400 text-right text-xs">
        {formatTimestamp(comment.updated_at)}
      </Typography>
    </div>
  );
}

export default Comments;
