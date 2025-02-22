import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaMapMarkerAlt, FaRegEdit, FaTint, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IoMailSharp } from "react-icons/io5";

function Profile() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedUpazila, setSelectedUpazila] = useState({ id: "", name: "" });

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  //   get district
  useEffect(() => {
    axiosPublic.get("/districts").then((response) => {
      setDistricts(response.data);
    });
  }, [axiosPublic]);

  //   get upazilas
  useEffect(() => {
    if (selectedDistrict.id) {
      axiosPublic
        .get(`/upazilas?district_id=${selectedDistrict.id}`)
        .then((response) => {
          setUpazilas(response.data);
        });
    }
  }, [axiosPublic, selectedDistrict]);

  const handleDistrictChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedDistrict({
      id: selectedOption.value,
      name: selectedOption.text,
    });
  };

  const handleUpazilaChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedUpazila({ id: selectedOption.value, name: selectedOption.text });
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const district = selectedDistrict.name;
    const upazila = selectedUpazila.name;
    const bloodGroup = form.bloodGroup.value;

    if (!name || !email || !bloodGroup || !district || !upazila) {
      toast.error("You Must Fill All The Fields For Update");
      return;
    }

    const user = { name, email, district, upazila, bloodGroup };

    // console.log(user);
    axiosSecure.put(`/user/${user.email}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        document.getElementById("my_modal_4").close();
        refetch();
        Swal.fire({
          icon: "success",
          title: "Successfully Update Profile!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  console.log(userData);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );

  return (
    <>
      <div className="p-4 lg:p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-3xl lg:text-5xl font-semibold text-red-500">
          Profile Information
        </h2>
        {/* profile section */}
        <div>
          <div className="flex justify-center mt-6">
            <img
              className="rounded-full border-2 border-red-500 p-2 w-28 lg:w-56 h-28 lg:h-56 object-cover"
              src={userData.image}
              alt=""
            />
          </div>
          <div className="mt-6">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h2 className="text-3xl font-semibold text-center text-red-500">
                  Update Profile Info
                </h2>
                <form onSubmit={handleSubmit}>
                  {/* user row */}
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
                    <div className="w-full lg:w-1/2">
                      <label className="text-btn-color block mb-2">Name:</label>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        defaultValue={userData.name}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="text-btn-color block mb-2">
                        Email:
                      </label>
                      <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        defaultValue={userData.email}
                        className="input input-bordered w-full"
                        readOnly
                      />
                    </div>
                  </div>
                  {/* district upazilas row */}
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
                    <div className="w-full lg:w-1/2">
                      <label className="text-btn-color block mb-2">
                        District:
                      </label>
                      <select
                        name="district"
                        className="border block w-full py-3 pl-4 pr-3 text-black bg-white rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={selectedDistrict.id}
                        onChange={handleDistrictChange}
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {districts.map((district) => (
                          <option key={district._id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="text-btn-color block mb-2">
                        Upazila:
                      </label>
                      <select
                        className="border block w-full py-3 pl-4 pr-3 text-black bg-white rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={selectedUpazila.id}
                        onChange={handleUpazilaChange}
                        disabled={!selectedDistrict.id}
                      >
                        <option value="" disabled>
                          Select Upazila
                        </option>
                        {upazilas.map((upazila) => (
                          <option key={upazila._id} value={upazila.id}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* blood group */}
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
                    <div className="w-full">
                      <label className="text-btn-color block mb-2">
                        Blood Group:
                      </label>
                      <select
                        name="bloodGroup"
                        className="border block w-full py-3 pl-4 pr-3 text-black bg-white rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    </div>
                  </div>
                  <div className="text-center mt-10">
                    <button type="submit" className="btn bg-red-500 text-white">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </dialog>

            {/* user details */}
            <div className="flex flex-col max-w-xl p-3 lg:p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-3 mx-auto relative">
              <div className="absolute right-5">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  <FaRegEdit size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-600 text-xl" />
                <p className="text-[22px] lg:text-2xl font-semibold text-gray-800">
                  {userData.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IoMailSharp size={20} className="text-gray-600" />
                <p className="text-[22px] lg:text-2xl font-semibold text-gray-800">
                  {userData.email}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <FaTint className="text-red-500 text-xl" />
                <p className="text-xl text-gray-700">
                  Blood Group:{" "}
                  <span className="font-medium text-red-500">
                    {userData.bloodGroup}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600 text-xl" />
                <p className="text-xl text-gray-700 font-bold">
                  <span className="font-medium">District:</span>{" "}
                  {userData.district}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600 text-xl" />
                <p className="text-xl text-gray-700 font-bold">
                  <span className="font-medium">Upazila:</span>{" "}
                  {userData.upazila}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
