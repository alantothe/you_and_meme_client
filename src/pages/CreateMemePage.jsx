import React, { useState } from "react";
import { memes } from "../assets/templates.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { postMeme } from "../api/api.js";

function CreateMemePage() {
  const oneMeme = memes[0];

  const initialTextFields = {};
  for (let i = 0; i < oneMeme.box_count; i++) {
    initialTextFields[`text${i}`] = "";
  }

  const [formData, setFormData] = useState({
    template_id: oneMeme.id,
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
      const formParams = new URLSearchParams(formData).toString();

      const response = await axios.post(
        "https://api.imgflip.com/caption_image",
        formParams,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setNewMeme(response.data.data.url);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const postData = {
    user: 3,
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
    <div className="flex flex-col items-center justify-start bg-gray-400"
    style={{ height: "92vh" }}>
      {/* Main title */}
      <h1 className="text-3xl font-semibold flex justify-center items-center"
        style={{ height: "10vh" }}>
        Create Meme Page
      </h1>
      {/* Meme container */}
      <div className="w-3/4 p-6 rounded shadow-md bg-gray-600">
        {/* Meme preview */}
        <div className="w-96 h-96 mx-auto relative">
          {newMeme ? (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={newMeme}
              alt="Generated Meme"
            />
          ) : (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={oneMeme.url}
              alt={oneMeme.name}
            />
          )}
        </div>
        {/* Text boxes */}
        <div className="mt-4">
          {Array.from({ length: oneMeme.box_count }).map((_, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`text${index}`}
                className="block mb-1 text-lg font-semibold"
              >
                Box {index + 1}
              </label>
              <input
                type="text"
                id={`text${index}`}
                value={formData[`text${index}`]}
                placeholder={`Enter text for Box ${index + 1}`}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-900"
              />
            </div>
          ))}
          <div className="flex justify-evenly">

            <button 
              onClick={() => handleSubmit()}
              className="bg-teal-400 text-gray-900 px-4 py-2 rounded"
            >
              Preview Meme
            </button>

            <button
              onClick={() => handleMemePost()}
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded"  
            >
              Generate Meme
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMemePage;