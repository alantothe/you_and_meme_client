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
  };

  return (
    <div className="flex flex-col justify-center mx-auto p-4 items-center">
      {/* Testing that the logic is working */}
      <div className="mb-4 px-44">
        <h1>Post User Name</h1>
        <img src={post.meme}></img>
        <Comments props={post.comments} />
      </div>
    </div>
  );
}

export default MemeDetailPage;
