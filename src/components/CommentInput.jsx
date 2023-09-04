import { useState } from "react";
import { createComment } from "../api/comments";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function CommentInput({ postId }) {
  const userId = useSelector((state) => state.user.userId);

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
  };

  const handlePost = () => {
    console.log("Comment submitted:", inputData);
    createComment(inputData);
    // After logging the data, you might want to clear the input.
    // setInputData((prevData) => ({
    //   ...prevData,
    //   body: "",
    // }));
    console.log("Comment submitted:", inputData);
  };

  return (
    // <div className="flex" style={{ width: "480px" }}>
    //   <input
    //     className="flex grow pl-2 outline-none"
    //     type="text"
    //     name="body" // <-- This 'name' attribute is crucial for the handleChange function
    //     value={inputData.body}
    //     onChange={handleChange}
    //     placeholder="Add a comment..."
    //   />
    //   <Typography
    //     className="justify-end text-yellow-400 ml-2 cursor-pointer"
    //     onClick={handlePost}
    //   >
    //     Post
    //   </Typography>
    // </div>
    <div className="relative w-full h-12">
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
