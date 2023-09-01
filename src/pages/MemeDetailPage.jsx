import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";
import Comments from "../components/Comments";

function MemeDetailPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const allComments = fetchedPost.comments; // Get comments from fetchedPost, not post
    setComments(allComments);
  }

  return (
    <div>
      <img src={post.meme} alt="meme-photo" />
      {comments.map((comment) => (
        <div key={comment.id}>
          {" "}
          {/* Make sure comment has an id property or use another unique key */}
          <Comments comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default MemeDetailPage;
