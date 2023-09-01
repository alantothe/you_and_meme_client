import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";
import Comments from "../components/Comments";

function MemeDetailPage() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    console.log(post.comments);
  };

  return (
    <div>
      <img src={post.meme}></img>
      <Comments props={post.comments} />
    </div>
  );
}

export default MemeDetailPage;
