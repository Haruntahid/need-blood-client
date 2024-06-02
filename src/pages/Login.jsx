import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelToogle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        reset();
        // navigate after login
        navigate(location?.state ? location.state : "/");
        toast.success("Log in successfully");
      })
      .catch((err) =>
        toast.error(
          err.message.replace(
            "Firebase: Error (auth/invalid-credential).",
            "Invalid Credential! Make Sure Your email and password is correct"
          )
        )
      );
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <Link className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                Login
              </Link>

              <Link
                to={"/register"}
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                Register
              </Link>
            </div>

            {/* Email */}
            <div className="mt-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8m-2 10a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14z" />
                  </svg>
                </span>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  type="email"
                  className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email"
                />
              </label>
              {errors.email && (
                <p className="text-red-500 mt-1">
                  Provide Your Email For Login
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-6">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 11c1.38 0 2.5 1.12 2.5 2.5S13.38 16 12 16s-2.5-1.12-2.5-2.5S10.62 11 12 11m0-4c-4 0-7 3-7 7v4h14v-4c0-4-3-7-7-7z" />
                  </svg>
                </span>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type={showPassword ? "text" : "password"}
                  className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
                <span
                  className="absolute top-[30%] right-[5%] text-white"
                  onClick={handelToogle}
                >
                  {showPassword ? (
                    <FaRegEye size={22} />
                  ) : (
                    <FaRegEyeSlash size={22} />
                  )}
                </span>
              </label>
              {errors.password && (
                <p className="text-red-500 mt-1">
                  Provide Your Password For Login
                </p>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Login
              </button>

              <div className="mt-6 text-center ">
                <p href="#" className="text-sm dark:text-blue-400">
                  Don&apos;t have an account?{" "}
                  <Link to={"/register"}>Create One</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
