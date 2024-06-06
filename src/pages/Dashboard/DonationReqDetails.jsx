import { useLoaderData } from "react-router-dom";
import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

function DonationReqDetails() {
  const data = useLoaderData();
  const {
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
      </div>
    </>
  );
}

export default DonationReqDetails;
