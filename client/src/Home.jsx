import { Link } from "react-router-dom";



function Home() {
 
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Home </h1>
      <div className="text-center mb-6">
        <Link to={`/post/12`} className="bg-green-500 hover:bg-blue-700 text-white">
         PostDetails
        </Link>
      </div>
    </div>
  );
}

export default Home;
