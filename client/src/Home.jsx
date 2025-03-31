import { Link } from "react-router-dom";
import CardList from "./components/CardList";

function Home() {
  return (
    <div>
      <div className="text-center mb-6 bg-secondary py-6">
        <div className="container flex justify-between place-items-center mx-auto">
          <h1 className="text-5xl font-bold text-white tracking-widest">
            Home
          </h1>
          <div className="flex justify-center gap-3">
            <Link
              to={`/createpost`}
              className="bg-tertiary text-white font-bold py-3 px-6 rounded-3xl shadow-lg transition-transform duration-300 hover:translate-y-1 hover:shadow-2xl"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-white tracking-widest text-center mt-10 mb-10">
          Posts
        </h3>
        <CardList />
      </div>
    </div>
  );
}

export default Home;
