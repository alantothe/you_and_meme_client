import React, { useEffect, useState } from "react";
import { memes } from "../assets/templates.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { postMeme } from "../api/api.js";
import { Typography, Button } from "@material-tailwind/react";

function CreateMemePage({ user }) {
  const { id } = useParams();
  const userId = user.user_id;

  const [meme, setMeme] = useState({});

  useEffect(() => {
    fetchMeme(id);
  }, []);

  function fetchMeme(memeId) {
    const foundMeme = memes.find((m) => m.id === memeId);
    if (foundMeme) {
      setMeme(foundMeme);
      console.log("yoo we found it ");
    } else {
      console.log("no meme bruh");
      setMeme({});
    }
  }

  const initialTextFields = {};
  for (let i = 0; i < meme.box_count; i++) {
    initialTextFields[`text${i}`] = "";
  }

  const [formData, setFormData] = useState({
    template_id: id,
    username: "alantothe",
    password: "Fresh1260!",
    ...initialTextFields,
  });

  const [newMeme, setNewMeme] = useState(null);

  const handleInputChange = (index, event) => {
    const updatedFormData = {
      ...formData,
      [`text${index}`]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      // Dynamically generate the parameters for boxes.
      let boxesParams = "";
      for (let i = 0; i < meme.box_count; i++) {
        boxesParams += `&boxes[${i}][text]=${encodeURIComponent(
          formData[`text${i}`]
        )}`;
      }

      const baseApiUrl = "https://api.imgflip.com/caption_image";
      const authParams = `template_id=${formData.template_id}&username=${formData.username}&password=${formData.password}`;

      const fullApiUrl = `${baseApiUrl}?${authParams}${boxesParams}`;

      const response = await axios.get(fullApiUrl);

      setNewMeme(response.data.data.url);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const postData = {
    user: userId,
    meme: newMeme,
  };
  console.log(postData);
  const handleMemePost = async () => {
    try {
      const response = await postMeme(postData);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4"> {/* Wrapping div, similar to SmallPostDetail */}
      
      {/* Page Title */}
      <Typography className="pl-4 text-3xl text-meme-light-gray">
        Create Your Own Meme!
      </Typography>
      
      {/* Meme Image Box */}
      <div
        className="w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg cursor-pointer border-meme-teal border-4 xs:w-screen xs:h-auto flex flex-col items-center"
        style={{
          boxShadow: "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)"
        }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          {newMeme ? (
            <img className="object-contain w-full h-full" src={newMeme} alt="Generated Meme" />
          ) : (
            <img className="object-contain w-full h-full" src={meme.url} alt={meme.name} />
          )}
        </div>
      </div>
  
      {/* Text boxes and Buttons */}
      <div className="px-4 flex flex-col items-center">
        {Array.from({ length: meme.box_count }).map((_, index) => (
          <div key={index} className="my-2">
            <Typography>Box {index + 1}</Typography>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={formData[`text${index}`]}
              placeholder={`Enter text for Box ${index + 1}`}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => handleSubmit()}
        >
          Preview Meme
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => handleMemePost()}
        >
          Generate Meme
        </button>
      </div>
    </div>
  );
}
export default CreateMemePage;  

