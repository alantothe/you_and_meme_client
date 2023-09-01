import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../api/api";
import SmallPostDetail from "../components/SmallPostDetail.jsx";

function ProfilePage() {
  const { profileId } = useParams();

  const [userObject, setUserObject] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const fetchedUserObject = await getPostsByUser(profileId);
    setUserObject(fetchedUserObject);
    setAllPosts(fetchedUserObject.posts);
  };

  return (
    <div>
      {allPosts.map((post, index) => (
        <SmallPostDetail allPosts={post} key={index} />
      ))}
    </div>
  );
}

export default ProfilePage;
