import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getAllTemplates } from "../api/api.js";

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
        background: "rgb(45, 45, 45)"
      }}
    >
      <h1 className="text-center p-4 mb-4 font-bold text-4xl">
        Meme Selection Page
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap px-48 items-center justify-center">
          {allTemplates.map((meme, index) => (
            <div
              className="flex flex-col w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg cursor-pointer border-meme-teal rounded-lg border-4 xs:w-screen xs:h-auto"
              style={{
                boxShadow:
                  "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
              }}
              key={index}
            >
              <div className="flex flex-col items-center justify-around h-full w-full">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={meme.url}
                  alt={meme.name}
                />
                <Button
                  className="m-2"
                  onClick={() => navigate(`/create-meme/${meme.id}`)}>
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
