import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const DetailPage = ({ onePost, comments }) => {
  return (
    <div className=" mx-auto p-4 flex flex-col items-center">
      <div className=" mb-4 flex justify-center">
        <img
          src={onePost.meme}
          alt="whatever"
          className="w-full h-auto rounded"
        />
      </div>
      <div
        className="comments overflow-y-auto bg-gray-100 p-4 rounded flex flex-col"
        style={{ height: "200px", width: "100%" }}
      >
        <ul className="flex flex-col items-center">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <strong className="mr-2">{comment.user}:</strong>
              {comment.comment}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-comment mt-4 flex flex-col items-center">
        <Input
          type="text"
          placeholder="Add a comment..."
          color="lightBlue"
          className="mb-2 w-full"
        />
        <Button color="blue" className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DetailPage;
