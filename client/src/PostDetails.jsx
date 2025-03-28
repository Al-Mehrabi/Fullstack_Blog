import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id);
       const res = await axios.get(`${API_URL}/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null); // Ensures the "Post not found" message appears.
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!post) return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <div className="bg-white p-4 ">
        <p><strong>Author:</strong> {post.author}</p>
        <p><strong>Content:</strong> {post.content}</p>
        <p><strong>Date:</strong> {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}</p>
        {post.cover ? <img src={post.cover} alt="Post Cover" className="w-60" /> : <p>No cover image available</p>}
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={handleDelete} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Post
        </button>
        <button 
          onClick={() => navigate(`/update/${id}`)} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => navigate("/")} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
