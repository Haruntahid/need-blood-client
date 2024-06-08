import { useLoaderData, useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function BloodDonationRequestsDetails() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const data = useLoaderData();
  const {
    _id,
    name,
    email,
    recipient_name,
    hospital_name,
    district,
    upazila,
    full_address,
    date,
    time,
    request_message,
    status,
  } = data;

  //   handle status
  const handleStatus = (id) => {
    console.log(id);
    axiosSecure.patch(`/blood-req-status/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        document.getElementById("my_modal_3").close();
        Swal.fire({
          icon: "success",
          title: "Successfully Send Donation Request!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/donation-request");
      }
    });
  };

  if (loading) return <p>Loading....</p>;
  return (
    <>
      <div className="p-10 bg-gray-200 rounded-2xl shadow-lg mx-auto ">
        <h2 className="text-center text-5xl font-bold text-red-500 mb-8">
          Donation Request Details
        </h2>
        <div className="space-y-6 bg-white p-8 rounded-lg max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <FaUser className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Requester: <span className="font-semibold">{name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Email: <span className="font-semibold">{email}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaUser className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Recipient: <span className="font-semibold">{recipient_name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaHospital className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Hospital: <span className="font-semibold">{hospital_name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Location:{" "}
              <span className="font-semibold">
                {district}, {upazila}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Full Address:{" "}
              <span className="font-semibold">{full_address}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Date: <span className="font-semibold">{date}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaClock className="text-purple-500" />
            <p className="text-xl text-gray-800 font-medium">
              Time: <span className="font-semibold">{time}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xl text-gray-800 font-medium">
              Status: <span className="font-semibold">{status}</span>
            </p>
          </div>
          <div className="flex items-start gap-4">
            <p className="text-xl text-gray-800 font-medium">
              Request Message:
            </p>
            <p className="text-xl text-gray-700">{request_message}</p>
          </div>
        </div>
        <div className="text-center mt-10">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="bg-red-500 text-white px-8 py-3 rounded-md"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Donate
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* donor details */}
              <form>
                <h2 className=" text-3xl text-red-500 font-semibold">
                  Donor Information
                </h2>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
                  <div className="w-full lg:w-1/2">
                    <label className=" block mb-2">Name:</label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      defaultValue={user.displayName}
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label className=" block mb-2">Email:</label>
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>
                </div>
              </form>
              <div className="mt-10">
                <button
                  onClick={() => handleStatus(_id)}
                  className="btn bg-red-500 text-white"
                >
                  Confirming Donation
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default BloodDonationRequestsDetails;
