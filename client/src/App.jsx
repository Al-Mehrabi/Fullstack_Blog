import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import PostDetails from "./PostDetails";
import UpdatePost from "./UpdatePost";

function App() {
  return (
    <Router>
      <div className="bg-sky-300 min-h-screen">
        

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
