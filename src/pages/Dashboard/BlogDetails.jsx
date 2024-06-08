import { FiUser, FiMail } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";

function BlogDetails() {
  const data = useLoaderData();
  console.log(data);
  const { title, thumbnail, content, status, author, authorEmail } = data;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[30vh] object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex gap-8">
        <div className="flex items-center text-gray-600 mb-2">
          <FiUser className="mr-2" />{" "}
          <span className="mr-2 font-semibold">Author:</span>
          <span className="capitalize">{author}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FiMail className="mr-2" />{" "}
          <span className="mr-2 font-semibold">Author Email:</span>
          {authorEmail}
        </div>
        <p>Status: {status}</p>
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>

        <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default BlogDetails;
