import React, { useEffect, useState } from "react";
import { memes } from "../assets/templates.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { postMeme } from "../api/api.js";

function CreateMemePage() {
  const { id } = useParams();

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
    user: 3,
    meme: newMeme,
  };
  console.log(postData);
  const handleMemePost = async () => {
    try {
      const response = await postMeme(postData);
      // Do something with the response if needed. E.g., show a success message or redirect the user.
      console.log("Successfully posted meme:", response);
    } catch (error) {
      console.error("Error in handleMemePost:", error);
      // Optionally show an error message to the user.
    }
  };

  return (
    <div>
      <h1>Create Meme Page</h1>
      <div className="w-1/4 mb-12 mt-12 flex flex-col items-center">
        <div className=" w-60 h-60 relative">
          {newMeme ? (
            <img
              className="absolute top-0 left-0 w-full h-full object-contain"
              src={newMeme}
              alt="Generated Meme"
            />
          ) : (
            <img
              className="absolute top-0 left-0 w-full h-full object-contain"
              src={meme.url}
              alt={meme.name}
            />
          )}
        </div>

        <div>
          {Array.from({ length: meme.box_count }).map((_, index) => (
            <div key={index}>
              <h1>Box {index + 1}</h1>
              <input
                type="text"
                value={formData[`text${index}`]}
                placeholder={`Enter text for Box ${index + 1}`}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
          <button onClick={() => handleSubmit()}>Preview Meme</button>
          <button onClick={() => handleMemePost()}>Generate Meme</button>
        </div>
      </div>
    </div>
  );
}

export default CreateMemePage;
