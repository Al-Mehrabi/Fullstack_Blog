import { useState, useEffect } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

function CardList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${APIURL}posts`);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:translate-y-[-5px]"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {post.title}
          </h2>
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 hover:scale-105"
          />
          <p className="text-gray-600 text-sm">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default CardList;
