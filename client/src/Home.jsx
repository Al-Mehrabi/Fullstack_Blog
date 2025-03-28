import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">My Travel Blog</h1>
      <div className="text-center mb-6">
        <Link to="/create" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Post
        </Link>
      </div>

      {posts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <li key={post.id} className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition">
              <img src={post.cover} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <h3 className="text-gray-700 mb-2">By: {post.author}</h3>
              <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                Read More
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
}

export default Home;
