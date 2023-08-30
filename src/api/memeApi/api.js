import api from "./apiConfig";

// FUNCTIONS FROM MEME API

export const getMemes = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeme = async (id) => {
  // there is no endpoint for getting a single meme in Imgflip API
  // we may have to filter through all the memes to find the one we want
};

// This will create a meme from a template
// When we call this function, we'll have to pass the required parameters
// like template_id, username, password, text0, text1 etc.
export const createMeme = async (params) => {
  try {
    const response = await api.post("/caption_image", params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Here's an example of how we would call this function:
// const memeParameters = {
//   template_id: 'some-template-id',
//   username: 'your-username',
//   password: 'your-password',
//   text0: 'Top Text',
//   text1: 'Bottom Text'
// };

// createMeme(memeParameters)
//   .then(response => {
//     console.log("Meme created:", response);
//   })
//   .catch(error => {
//     console.error("Error creating meme:", error);
//   });
