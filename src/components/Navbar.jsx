import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  return (
    <>
      <div className="bg-red-500">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-3xl text-white">Need-Blood?</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-3 text-xl">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white border-b-2" : ""
                  }
                  to={"/"}
                >
                  Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b-2" : ""
                  }
                  to={"/blog"}
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary border-b-2" : ""
                  }
                  to={"/blog"}
                >
                  Fundings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* Dropdown btn */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 md:py-1 md:px-4 border-[1px] border-neutral-100 flex flex-row items-center gap-4 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu size={20} />
              <div className="hidden md:block">
                {/* Avatar */}
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={
                    user && user.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/HTR5dpk/16-168770-user-iconset-no-profile-picture-icon-circle-clipart.jpg"
                  }
                  alt="profile"
                  height="50"
                  width="50"
                />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 md:right-28 top-[70px] text-sm">
              <div className="flex flex-col cursor-pointer w-full">
                <Link
                  to="/"
                  className="block md:hidden px-4 py-3  hover:bg-neutral-200 transition font-semibold"
                >
                  Home
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 w-full hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={logOut}
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
