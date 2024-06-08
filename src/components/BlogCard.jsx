import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-red-50 rounded-lg shadow-lg overflow-hidden p-4">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h2>
        <p className="text-gray-600">
          Posted By <span className="capitalize">{blog.author}</span>
        </p>
        <div className="my-4">
          <Link
            to={`/blog-details/${blog._id}`}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
