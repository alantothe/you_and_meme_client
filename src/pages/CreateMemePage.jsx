import React, { useState } from "react";
import { memes } from "../assets/templates.js";
import axios from "axios";

function CreateMemePage() {
  const oneMeme = memes[0];

  //
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
      // Convert formData to URL-encoded string
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

      return setNewMeme(response.data.data.url);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  console.log("newMeme", newMeme);

  return (
    <div>
      <h1>Create Meme Page</h1>
      <div className="w-1/4 mb-12 mt-12 flex flex-col items-center">
        <div className=" w-60 h-60 relative">
          <img
            className="absolute top-0 left-0 w-full h-full object-contain"
            src={oneMeme.url}
            alt={oneMeme.name}
          />
        </div>

        <div>
          {Array.from({ length: oneMeme.box_count }).map((_, index) => (
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
          <button onClick={() => handleSubmit()}>Generate Meme</button>
        </div>
      </div>
    </div>
  );
}


export default CreateMemePage;
