import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

const APIURL = import.meta.env.VITE_API_URL;

function CardList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await axios.get(`${APIURL}posts`);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLoader color="black" size={100} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:translate-y-[-5px] flex justify-between flex-col place-items-center"
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {post.title}
            </h2>

            <p className="text-gray-500 text-sm mb-2">
              {post.date
                ? new Date(post.date).toLocaleString()
                : "No date available"}
            </p>

            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-48 object-contain rounded-lg mb-4 transition-all duration-300 hover:scale-105"
            />
            <p className="text-gray-600 text-sm">{post.content}</p>
          </div>

          <Link
            to={`/post/${post.id}`}
            className="bg-black border text-white border-black font-bold py-3 px-6 rounded-3xl shadow-lg transition-transform duration-300 hover:translate-y-1 hover:shadow-2xl mt-5"
          >
            PostDetails
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CardList;
