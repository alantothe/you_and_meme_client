import React from "react";
import { memes } from "../assets/templates.js";
import { Button } from "@material-tailwind/react";

// {
//   id: "181913649",
//   name: "Drake Hotline Bling",
//   url: "https://i.imgflip.com/30b1gx.jpg",
//   width: 1200,
//   height: 1200,
//   box_count: 2,
//   captions: 0,
// },
// }

function MemeSelectionPage() {
  return (
    <div className="meme-selection-page flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center mb-8">Meme Selection Page</h1>

      <div className="flex flex-wrap px-48 items-center justify-center ">
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
              <Button>Use Template</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemeSelectionPage;
