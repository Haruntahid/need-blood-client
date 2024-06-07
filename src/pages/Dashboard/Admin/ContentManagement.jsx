import { Link } from "react-router-dom";

function ContentManagement() {
  return (
    <>
      <Link to={"/dashboard/content-management/add-blog"}>Add Blog</Link>
    </>
  );
}

export default ContentManagement;
