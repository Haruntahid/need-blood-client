import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [] } = useQuery({
    queryKey: ["published-blog"],
    queryFn: async () => {
      const res = await axiosPublic("/blog-published");
      return res.data;
    },
  });
  return (
    <>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.key} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default BlogPage;
