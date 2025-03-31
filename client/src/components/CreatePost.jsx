import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const APIURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [post, setPost] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.content || !post.cover) {
      setError("Please fill all required fields");
      return;
    }

    const currentDate = new Date().toISOString();

    const postWithDate = {
      ...post,
      date: currentDate,
    };

    try {
      const res = await axios.post(`${APIURL}posts`, postWithDate);
      console.log("Post created", res.data);

      setPost({
        author: "",
        title: "",
        content: "",
        cover: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create a New Post
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Author Field */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter author's name"
          />
        </div>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter post content"
            rows="4"
          ></textarea>
        </div>

        {/* Cover Image Field */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            name="cover"
            value={post.cover}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter the cover image URL"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
