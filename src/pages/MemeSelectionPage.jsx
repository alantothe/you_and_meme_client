import React from "react";
import { memes } from "../assets/templates.js";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function MemeSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="meme-selection-page flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center mb-8 font-bold text-4xl mt-10">Meme Selection Page</h1>

      <div className="flex flex-wrap px-48 items-center justify-center">
        {memes.map((meme, index) => {
          return (
            <div
              className="w-1/4 mb-12 mt-12 flex flex-col items-center"
              key={index}
            >
              <div className=" w-60 h-60 relative">
                <img
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  src={meme.url}
                  alt={meme.name}
                />
              </div>
              <Button onClick={() => navigate(`/create-meme/${meme.id}`)}>
                Use Template
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemeSelectionPage;
