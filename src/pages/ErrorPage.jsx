import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            className="w-full lg:w-[50%] max-w-full"
            src="https://i.postimg.cc/rF2SS8Jp/17034988.jpg"
            alt=""
          />
          <Link
            className="bg-red-500 text-xl text-white px-10 py-2 rounded-lg"
            to={"/"}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
