import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";

function MemeDetailPage({ userId }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  console.log(userId);

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const fetchedPost = await getPostById(postId);
    setPost(fetchedPost);
    const allComments = fetchedPost.comments;
    setComments(allComments);
    console.log(comments);
  }

  return (
    <div className="flex flex-col justify-center mx-auto p-4 items-center">
      <div className="mb-4 px-44">
        <img src={post.meme} alt="meme-photo" />
      </div>
      <div>
        <CommentInput postId={postId} userId={userId} />
      </div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          {" "}
          <Comments comment={comment} key={index} />
        </div>
      ))}
    </div>
  );
}

export default MemeDetailPage;
