import { useState } from "react";
import { createComment } from "../api/comments";
import { useSelector } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function CommentInput({ postId, commentsToggle, setCommentsToggle }) {
  const userId = useSelector((state) => state.user.entireUser?.user);

  const [input, setInput] = useState(false);
  const [inputData, setInputData] = useState({
    user: userId,
    post: parseInt(postId),
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInput(true);
  };

  const handlePost = async () => {
    if (!inputData.body) return;
    await createComment(inputData);
    setCommentsToggle(!commentsToggle);
    setInputData((prevData) => ({
      ...prevData,
      body: "",
    }));
  };

  return (
    <div
      className="relative w-full h-12"
      style={{
        boxShadow:
          "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
      }}
    >
      <input
        type="text"
        name="body"
        value={inputData.body}
        onChange={handleChange}
        className={`w-full h-full rounded py-2 bg-meme-gray pl-3 pr-12 placeholder-zinc-700 text-white font-thin mb-5 outline-none`}
        style={{ border: "1px solid rgb(4, 209, 189)" }}
        placeholder="Comment..."
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        <PaperAirplaneIcon
          className={`h-7 w-7 cursor-pointer ${
            inputData.body ? "text-meme-teal" : "text-meme-dark-gray"
          }`}
          onClick={handlePost}
        />
      </div>
    </div>
  );
}

export default CommentInput;
