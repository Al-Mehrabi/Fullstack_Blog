import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import PostDetails from "./PostDetails";
import UpdatePost from "./UpdatePost";

function App() {
  return (
    <Router>
      <div className="bg-green-500 min-h-screen">
        <nav className="bg-green-700 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-xl font-bold">My Travel Blog</Link>
            <Link to="/create" className="bg-white text-green-700 px-4 py-2 rounded">Create Post</Link>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
