import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsByUser } from "../api/api";
import SmallPostDetail from "../components/SmallPostDetail.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const { profileId } = useParams();

  const [allPosts, setAllPosts] = useState([{}]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const fetchedPosts = await getPostsByUser(profileId);
    setAllPosts(fetchedPosts);
    console.log(allPosts);
  };

  return (
    <div>
      <div>
        <div>{allPosts.posts[0].meme}</div>
      </div>
      {/* <div>
        {allPosts.meme.map((allPosts, index) => (
          <SmallPostDetail allPosts={allPosts} key={index} />
        ))}
      </div> */}
    </div>
  );
}

export default ProfilePage;
