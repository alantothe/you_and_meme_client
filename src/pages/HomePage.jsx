import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts.js";
import HomePostDetail from "../components/HomePostDetail.jsx";
import { Typography } from "@material-tailwind/react";
// import Avatar from "react-avatar";

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const posts = await getAllPosts();
    setAllPosts(sortPosts(posts));
  };

  const sortPosts = (posts) => {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    return sortedPosts;
  };

  console.log("the comments?" + allPosts.comments);
  // const mockAvatar =
  //   "https://res.cloudinary.com/dzjr3skhe/image/upload/v1693696048/yl6pdqk1fohrh920j5mq.png";
  return (
    <div
      className="text-yellow-400 mb-4 w-full max-w-screen-xl mx-auto"
      style={{ background: "rgb(45, 45, 45)" }}
    >
      {/* Post MVP Idea */}
      {/* <div className="flex justify-center gap-10 py-10">
        <Avatar
          src={mockAvatar}
          round={true}
          size="80"
          className="border-2 border-meme-teal hover:opacity-50 hover:border-white cursor-pointer"
        />
        <Avatar
          src={mockAvatar}
          round={true}
          size="80"
          className="border-2 border-meme-teal hover:opacity-50 hover:border-white cursor-pointer"
        />
        <Avatar
          src={mockAvatar}
          round={true}
          size="80"
          className="border-2 border-meme-teal hover:opacity-50 hover:border-white cursor-pointer"
        />
        <Avatar
          src={mockAvatar}
          round={true}
          size="80"
          className="border-2 border-meme-teal hover:opacity-50 hover:border-white cursor-pointer"
        />
      </div> */}
      {/* <Typography className="text-center p-4 mb-4 font-bold text-4xl">
        Welcome to You & Meme!
      </Typography>
      <Typography className="text-center mb-8 font-bold text-2xl">
        A place to share & create your favorite memes!
      </Typography> */}
      <div className="flex flex-col items-center w-full">
        {allPosts.map((post, index) => (
          <HomePostDetail allPosts={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
