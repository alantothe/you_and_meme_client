import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser, getUserById } from "../api/users.js";
import { deletePost } from "../api/posts.js";
import SmallPostDetail from "../components/SmallPostDetail.jsx";
import { Avatar, Typography } from "@material-tailwind/react";

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
    setAllPosts(sortPosts(fetchedUserObject.posts));
  };

  const sortPosts = (posts) => {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    return sortedPosts;
  };

  return (
    <div
      className="flex flex-col items-center text-yellow-400"
      style={{ background: "rgb(45, 45, 45)" }}
    >
      <div className="flex">
        <Avatar src={user.avatar} round={true} size="40" />
        <Typography className="text-6xl my-4">{user.user_string}</Typography>
      </div>
      <p>a bio</p>
      <div className="flex justify-center">
        <div className="flex flex-wrap px-48 items-center justify-center">
          {allPosts.map((post, index) => (
            <div>
              <SmallPostDetail allPosts={post} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
