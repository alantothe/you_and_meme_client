import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const DetailPage = () => {
  // State to hold real data from the API
  const [memeData, setMemeData] = useState(null);
  const [comments, setComments] = useState([]);
  const memeId = 1; // Replace this with the actual meme ID you are interested in.

  useEffect(() => {
    // Fetch meme data when component mounts
    axios.get(`http://localhost:8000/api/memes/${memeId}/`)
      .then(response => {
        setMemeData(response.data);
      })
      .catch(error => {
        console.log('Could not fetch meme:', error);
      });

    // Fetch comments for the meme
    axios.get(`http://localhost:8000/api/comments/?meme=${memeId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.log('Could not fetch comments:', error);
      });
  }, []);

  if (!memeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="meme-detail">
        <img src={memeData.memeUrl} alt="Meme" className="w-full h-auto" />
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
