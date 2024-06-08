import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

// eslint-disable-next-line react/prop-types
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [role, Loading] = useRole();
  const location = useLocation();

  if (loading || Loading) return <p>loading.....</p>;
  if (role === "Admin" && user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}

export default AdminRoute;
