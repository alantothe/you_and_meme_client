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
    <div>
      <h1>{user.user_string}</h1>
      <div
        className="w-60 h-60 p-4 m-4 shadow-lg rounded-lg cursor-pointer bg-meme-teal xs:w-screen xs:h-auto"
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
    </div>
  );
}

export default SmallPostDetail;
