import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";

function MemeDetailPage() {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
  };

  return (
    <div>
      {/* Testing that the logic is working */}
      <img src={post.meme}></img>
    </div>
  );
}

export default MemeDetailPage;
