import { Link, useNavigate } from "react-router-dom";
import { FaDroplet, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const selectedDistrict = watch("district");

  useEffect(() => {
    // Fetch districts data
    axiosPublic.get("/districts").then((response) => {
      setDistricts(response.data);
    });
  }, [axiosPublic]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch upazilas data based on the selected district
      axiosPublic
        .get(`/upazilas?district_id=${selectedDistrict}`)
        .then((response) => {
          setUpazilas(response.data);
        });
    }
  }, [axiosPublic, selectedDistrict]);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const imageHostingKey = import.meta.env.VITE_Image_key;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const onSubmit = async (data) => {
    const { name, email, password, bloodGroup, district, upazila } = data;
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    try {
      // Upload the image to image hosting service
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res.data);
      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        // Register the user with email and password
        await registerUser(email, password);

        // Update the user profile with the name and image URL
        await updateUserProfile(name, imageUrl);

        // Find the district name based on the selected district ID
        const selectedDistrictObj = districts.find((d) => d.id === district);
        const districtName = selectedDistrictObj
          ? selectedDistrictObj.name
          : "";

        // Prepare user info for saving to the database
        const userInfo = {
          name,
          email,
          image: imageUrl,
          bloodGroup,
          district: districtName,
          upazila,
          role: "Donor",
          status: "active",
        };

        // Save user info to the database
        const userResponse = await axiosPublic.post("/users", userInfo);
        console.log(userResponse.data);
        if (userResponse.data.insertedId) {
          reset();
          toast.success("Registration Successful!");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const password = watch("password", "");

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <Link
              to="/login"
              className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              Login
            </Link>

            <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
              Register
            </span>
          </div>

          {/* Name */}
          <div className="mt-8">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                {...register("name", { required: true })}
                type="text"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
            </label>
            {errors.name && (
              <p className="text-red-500 mt-2">Name is required</p>
            )}
          </div>

          {/* Image */}
          <label className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input
              {...register("image", { required: true })}
              type="file"
              className="hidden"
            />
          </label>
          {errors.image && (
            <p className="text-red-500 mt-1">Photo is required</p>
          )}

          {/* Blood Group */}
          <div className="mt-8">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaDroplet className="w-5 h-5 text-gray-300 dark:text-gray-500" />
              </span>
              <select
                {...register("bloodGroup", {
                  required: true,
                  validate: (value) => value !== "DEFAULT",
                })}
                defaultValue="DEFAULT"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="DEFAULT" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </label>
            {errors.bloodGroup && (
              <p className="text-red-500 mt-2">Blood group is required</p>
            )}
          </div>

          {/* District */}
          <div className="mt-8">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <select
                {...register("district", {
                  required: true,
                  validate: (value) => value !== "DEFAULT",
                })}
                defaultValue="DEFAULT"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="DEFAULT" disabled>
                  Select District
                </option>
                {districts.map((district) => (
                  <option key={district._id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.district && (
              <p className="text-red-500 mt-2">District is required</p>
            )}
          </div>

          {/* Upazila */}
          <div className="mt-8">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <select
                {...register("upazila", {
                  required: true,
                  validate: (value) => value !== "DEFAULT",
                })}
                defaultValue="DEFAULT"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="DEFAULT" disabled>
                  Select Upazila
                </option>
                {upazilas.map((upazila) => (
                  <option key={upazila._id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.upazila && (
              <p className="text-red-500 mt-2">Upazila is required</p>
            )}
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
              <p className="text-red-500 mt-1">Valid email is required</p>
            )}
          </div>
          {/* Password */}
          <div className="mt-8">
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                type={showPassword ? "text" : "password"}
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              <span
                onClick={handleToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                ) : (
                  <FaRegEyeSlash className="w-5 h-5 text-gray-300 dark:text-gray-500" />
                )}
              </span>
            </label>
            {errors.password && (
              <p className="text-red-500 mt-2">
                Password is required and should be at least 6 characters long
              </p>
            )}
          </div>

          {/* Confirm Password */}
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
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
              />
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
