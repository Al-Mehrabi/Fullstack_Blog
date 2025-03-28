import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ author: '', title: '', content: '', cover: '' });

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        console.log("Fetching post with ID:", id);
        const res = await axios.get(`${APIURL}/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error("Error: No post ID found.");
      return;
    }
    try {
      console.log("Updating post with ID:", id);
      const res = await axios.put(`${APIURL}/posts/${id}`, post);
      console.log("Update successful:", res.data);
      navigate(`/post/${id}`); // Redirect to the updated post
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Cover Image URL</label>
          <input
            type="text"
            name="cover"
            value={post.cover}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
