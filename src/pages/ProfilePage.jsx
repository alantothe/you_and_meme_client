import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser, getUserById } from "../api/api";
import SmallPostDetail from "../components/SmallPostDetail.jsx";
import { Typography } from "@material-tailwind/react";

function ProfilePage() {
  const { profileId } = useParams();

  const [userObject, setUserObject] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
    getPosts();
  }, []);

  const fetchUser = async () => {
    const fetchedUser = await getUserById(profileId);
    setUser(fetchedUser);
  };

  const getPosts = async () => {
    const fetchedUserObject = await getPostsByUser(profileId);
    setUserObject(fetchedUserObject);
    setAllPosts(fetchedUserObject.posts);
  };

  return (
    <div
      className="flex flex-col items-center text-yellow-400"
      style={{ background: "rgb(45, 45, 45)" }}
    >
      <Typography className="text-6xl my-4">
        {user.user_string}'s page
      </Typography>
      <p>a bio</p>
      {allPosts.map((post, index) => (
        <SmallPostDetail allPosts={post} key={index} />
      ))}
    </div>
  );
}

export default ProfilePage;
