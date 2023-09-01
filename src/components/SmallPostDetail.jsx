import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/api";
import "./styles.css";

function SmallPostDetail({ allPosts }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const fetchedUser = await getUserById(allPosts.user);
    setUser(fetchedUser);
  };

  return (
    <div className="my-4">
      <h1 className="pl-4">{user.user_string}</h1>
      <div
        className="w-80 h-80 p-4 mx-4 mb-4 mt-2 shadow-lg cursor-pointer border-meme-teal border-4 xs:w-screen xs:h-auto"
        style={{
          boxShadow:
            "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
        }}
        onClick={() => {
          navigate(`/meme-detail-page/${allPosts.id}`);
        }}
      >
        <div className="flex flex-col items-center justify-around h-full w-full">
          <img
            className="object-contain w-full h-full"
            src={allPosts.meme}
            key={allPosts.id}
          />
        </div>
      </div>
      <div className="px-4 flex justify-between">
        <p>{allPosts.likes} likes</p>
        <p>{allPosts.created.slice(0, 10)}</p>
      </div>
    </div>
  );
}

export default SmallPostDetail;
