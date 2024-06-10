import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router-dom";

function DonorRoutes() {
  return (
    <>
      <NavLink
        to={"donor"}
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
        to={"/dashboard/profile"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
            : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        }
      >
        <FaUser />
        <span className="mx-2 text-sm font-medium text-white">Profile</span>
      </NavLink>

      <NavLink
        to={"/dashboard/my-donation-request"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
            : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        }
      >
        <BiSolidDonateBlood />
        <span className="mx-2 text-sm font-medium text-white">
          My Donation Requests
        </span>
      </NavLink>

      <NavLink
        to={"/dashboard/create-donation-request"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
            : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        }
      >
        <MdCreateNewFolder />
        <span className="mx-2 text-sm font-medium text-white">
          Create Donation Request
        </span>
      </NavLink>
    </>
  );
}

export default DonorRoutes;
