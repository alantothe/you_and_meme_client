import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getAllTemplates } from "../api/memes.js";

function MemeSelectionPage() {
  const navigate = useNavigate();
  const [allTemplates, setAllTemplates] = useState([]);

  useEffect(() => {
    fetchAllTemplates();
    console.log(allTemplates);
  }, []);

  async function fetchAllTemplates() {
    const templates = await getAllTemplates();
    setAllTemplates(templates);
  }

  return (
    <div
      className="min-h-screen text-yellow-400"
      style={{
        background: "rgb(45, 45, 45)",
      }}
    >
      <h1 className="text-center p-4 mb-4 font-bold text-4xl">
        Meme Selection Page
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap px-48 items-center justify-center">
          {allTemplates.map((meme, index) => (
            <div
              className="flex flex-col w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg border-meme-teal border-4 xs:w-screen xs:h-auto hover:bg-meme-gray"
              style={{
                boxShadow:
                  "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
              }}
              key={index}
            >
              <div className="flex flex-col items-center justify-between h-full w-full">
                <div className="w-full flex-grow rounded-lg overflow-hidden">
                  <img
                    className="object-contain w-full h-full"
                    src={meme.url}
                    alt={meme.name}
                  />
                </div>
                <Button
                  variant="text"
                  className="mt-2 rounded-none text-meme-dark-gray bg-meme-teal hover:text-white hover:bg-meme-dark-gray"
                  onClick={() => navigate(`/create-meme/${meme.id}`)}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemeSelectionPage;
