import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  const APIURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${APIURL}posts/${id}`);
        setPost(res.data);
      } catch (error) {
        setError("Failed to load post details");
        console.error("Error fetching post details:", error);
      }
    };
    fetchPost();
  }, [id, APIURL]);

  if (!post) {
    return <p className="text-center text-white">Loading post details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
     
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Details</h1>

      <h2 className="text-4xl font-bold text-gray-800 mb-4">Title :{post.title}</h2>
      <p className="text-1xl font-bold text-gray-800 mb-4">Date: {post.date}</p>
   
      <img
        src={post.cover}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 leading-relaxed">Contant :{post.content}</p>

      <div className="flex gap-2 mt-4">
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
