import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function VolunteerRoutes() {
  return (
    <>
      <NavLink
        to={"/dashboard/volunteer"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
            : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        }
      >
        <IoHome />
        <span className="mx-2 text-sm font-medium text-white">Home</span>
      </NavLink>
      <NavLink
        to={"/dashboard/all-blood-donation-request2"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
            : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        }
      >
        <IoHome />
        <span className="mx-2 text-sm font-medium text-white">
          All Blood Donation Request
        </span>
      </NavLink>
    </>
  );
}

export default VolunteerRoutes;
