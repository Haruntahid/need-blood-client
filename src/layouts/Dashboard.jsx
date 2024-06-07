import { IoHome } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdCreateNewFolder } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

function Dashboard() {
  const { logOut } = useAuth();
  const [role, Loading] = useRole();
  console.log(role);

  if (Loading) return <p>Loading.......</p>;

  return (
    <div className="relative min-h-screen flex">
      <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 fixed">
        <a>
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-3 ">
            {role === "Admin" && (
              <>
                <NavLink
                  to={"/dashboard/admin"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
                      : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  }
                >
                  <IoHome />
                  <span className="mx-2 text-sm font-medium">Home</span>
                </NavLink>
                <NavLink
                  to={"/dashboard/all-users"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-gray-100 dark:bg-gray-800 "
                      : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  }
                >
                  <IoHome />
                  <span className="mx-2 text-sm font-medium">All Users</span>
                </NavLink>
              </>
            )}

            {/* Donor */}
            {role === "Donor" && (
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
                  <span className="mx-2 text-sm font-medium">Home</span>
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
                  <span className="mx-2 text-sm font-medium">Profile</span>
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
                  <span className="mx-2 text-sm font-medium">
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
                  <span className="mx-2 text-sm font-medium">
                    Create Donation Request
                  </span>
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* footer logout btn */}
        <div className="pb-10">
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
