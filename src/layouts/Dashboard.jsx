import { IoHome } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import AdminRoutes from "../pages/Dashboard/DashboardRoute/AdminRoutes";
import DonorRoutes from "../pages/Dashboard/DashboardRoute/DonorRoutes";
import VolunteerRoutes from "../pages/Dashboard/DashboardRoute/VolunteerRoutes";

function Dashboard() {
  const { logOut } = useAuth();
  const [role, Loading] = useRole();
  console.log(role);

  if (Loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );

  return (
    <div className="relative min-h-screen flex">
      <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-red-500 border-r rtl:border-r-0 rtl:border-l fixed">
        <Link to={"/"}>
          <img
            className="w-auto h-14 mx-auto"
            src="https://i.ibb.co/2qtgY2Z/445379615-331727106468525-5982881440624507647-n.png"
            alt=""
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-3 ">
            {role === "Admin" && <AdminRoutes />}

            {/* Donor */}
            {role === "Donor" && <DonorRoutes />}

            {/* volunteer dashboard */}
            {role === "Volunteer" && <VolunteerRoutes />}
          </nav>
        </div>

        {/* footer logout btn */}
        <div className="pb-10">
          <Link
            to={"/"}
            className="flex mb-3 items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-black "
          >
            <IoHome />
            <span className="mx-2 text-sm font-medium text-white">
              Back To Home Page
            </span>
          </Link>

          <button
            onClick={logOut}
            className="flex w-full items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <CiLogout size={20} color="#fff" />
            <span className="mx-2 text-sm font-medium text-white">Logout</span>
          </button>
        </div>
      </aside>

      {/* Outlet --> Dynamic content */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
