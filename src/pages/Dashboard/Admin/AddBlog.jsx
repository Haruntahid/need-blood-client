import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const { user, loading } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);
  const navigate = useNavigate();

  console.log(user);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.thumbnail[0]);

      const imageHostingKey = import.meta.env.VITE_Image_key;

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
        formData
      );

      const thumbnailUrl = imageRes.data.data.url;

      // Create blog object
      const blog = {
        title: data.title,
        thumbnail: thumbnailUrl,
        content: content,
        status: "draft",
        author: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoUrl,
      };

      // Send blog data to database
      await axiosSecure.post("/add-blog", blog);

      // Reset the form
      reset();
      setContent("");
      toast.success("Blog created successfully!");
      navigate("/dashboard/content-management");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog. Please try again.");
    }
  };

  if (loading) return <p>loading....</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Add Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail Image
          </label>
          <input
            type="file"
            {...register("thumbnail", { required: true })}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)} // Save the content onBlur to minimize re-renders
            config={{
              readonly: false,
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
