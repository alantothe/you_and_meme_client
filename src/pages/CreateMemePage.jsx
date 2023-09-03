import React, { useState } from "react";
import { memes } from "../assets/templates.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { postMeme } from "../api/posts.js";
import { Typography } from "@material-tailwind/react";

<<<<<<< HEAD
function CreateMemePage() {
  const oneMeme = memes[0];
=======
function CreateMemePage({ user }) {
  const { id } = useParams();
  const userId = user.user_id;

  const navigate = useNavigate();

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
>>>>>>> 79a51d13b47a451d486e8026e27433e9b27ac08c

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
<<<<<<< HEAD
    user: 3,
=======
    user: userId,
>>>>>>> 79a51d13b47a451d486e8026e27433e9b27ac08c
    meme: newMeme,
  };
  console.log(postData);
  const handleMemePost = async () => {
    try {
      const response = await postMeme(postData);

      console.log(response);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="my-4 flex flex-col items-center justify-center">
      {" "}
      {/* Wrapping div, similar to SmallPostDetail */}
      {/* Page Title */}
      <Typography className="text-center pl-4 text-3xl text-meme-light-gray">
        Create Your Own Meme!
      </Typography>
      {/* Meme Image Box */}
      <div
        className="w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg cursor-pointer border-meme-teal border-4 xs:w-screen xs:h-auto flex flex-col items-center"
        style={{
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          {newMeme ? (
            <img
              className="object-contain w-full h-full"
>>>>>>> 79a51d13b47a451d486e8026e27433e9b27ac08c
              src={newMeme}
              alt="Generated Meme"
            />
          ) : (
            <img
<<<<<<< HEAD
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
=======
              className="object-contain w-full h-full"
              src={meme.url}
              alt={meme.name}
            />
          )}
        </div>
      </div>
      {/* Text boxes and Buttons */}
      <div className="px-4 flex flex-col items-center text-meme-light-gray">
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
          className="bg-meme-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4"
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
>>>>>>> 79a51d13b47a451d486e8026e27433e9b27ac08c
      </div>
    </div>
  );
}
<<<<<<< HEAD

export default CreateMemePage;
=======
export default CreateMemePage;
>>>>>>> 79a51d13b47a451d486e8026e27433e9b27ac08c
