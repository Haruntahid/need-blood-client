import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";

function ContentManagement() {
  const axiosSecure = useAxiosSecure();
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-blogs");
      return res.data;
    },
  });

  const handleStatus = (id) => {
    axiosSecure.patch(`/blog-published/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully Status Updated!");
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blog/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Blog has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );
  return (
    <>
      <div className="p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-3xl lg:text-5xl font-semibold text-red-500">
          Content Management
        </h2>
      </div>
      <div className="text-right mt-10">
        <Link
          className="btn text-white  bg-red-500"
          to={"/dashboard/content-management/add-blog"}
        >
          Add Blog
        </Link>
      </div>

      {/* blogs */}
      {blogs.length > 0 ? (
        <div className="flex flex-col mt-10">
          <div className="-mx-4 -my-2 overflow-x-auto lg:overflow-x-hidden">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Thumbnail</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Author
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                        Details
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                        Action
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-bg-color divide-y divide-btn-color">
                    {blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td className="px-4 py-4 whitespace-nowrap capitalize">
                          <img
                            className="w-16 h-16 object-cover"
                            src={blog.thumbnail}
                            alt=""
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {blog.title}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                          {blog.author}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                          <span
                            className={`flex justify-center items-center gap-2 px-6 py-1 rounded-full text-${
                              blog.status === "published" ? "green" : "red"
                            }-500`}
                          >
                            <span
                              className={`w-3 h-3 rounded-full ${
                                blog.status === "published"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></span>
                            {blog.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                          <Link
                            className="px-8 py-2 rounded-full bg-red-400 hover:bg-red-600 text-white"
                            to={`/dashboard/blog-details/${blog._id}`}
                          >
                            View Blog
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                          <button
                            className={`px-5 py-2 rounded-md min-w-28 text-xs ${
                              blog.status === "published"
                                ? "bg-red-500 text-white hover:bg-red-700"
                                : "bg-green-500 text-white hover:bg-green-700"
                            }`}
                            onClick={() => handleStatus(blog._id)}
                          >
                            {blog.status === "published"
                              ? "Unpublished"
                              : "Published"}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3 justify-center">
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="btn bg-red-500 hover:bg-red-700"
                          >
                            <IoTrash size={25} color="#fff" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-5xl font-semibold text-red-300">
            No Donation request
          </p>
        </div>
      )}
    </>
  );
}

export default ContentManagement;
