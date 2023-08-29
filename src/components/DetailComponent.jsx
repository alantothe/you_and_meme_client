import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { getComments, getMeme } from "../api/api";


const DetailPage = () => {
  // State to hold real data from the API
  const [memeData, setMemeData] = useState(null);
  const [comments, setComments] = useState([]);
  const memeId = 1; // Replace this with the actual meme ID you are interested in.

  useEffect(() => {
    fetchMeme();
    fetchComments();
  }, []);

  async function fetchMeme() {
    try {
      const oneMeme = await getMeme(memeId);
      setMemeData(oneMeme);
    } catch (error) {
      console.log('Error fetching meme:', error);
    }
  }

  async function fetchComments() {
    try {
      const comments = await getComments(memeId);
      setComments(comments);
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  }

  if (!memeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="meme-detail">
        <img src={memeData.url} alt="Meme" className="w-full h-auto" />
      </div>
      <div className="comments">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-comment">
        <Input type="text" placeholder="Add a comment..." />
        <Button color="blue">Submit</Button>
      </div>
    </div>
  );
};

export default DetailPage;
