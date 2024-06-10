import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["published-blog"],
    queryFn: async () => {
      const res = await axiosPublic("/blog-published");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default BlogPage;
