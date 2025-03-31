import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import PostDetails from "./components/PostDetails";
import UpdatePost from "./components/UpdatePost";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Router>
      <div className="bg-primary  min-h-screen ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
