import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";

function VolunteerHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["overview/donors-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/overview/donors-requests");
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );
  return (
    <>
      {" "}
      <div className="p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          Welcome{" "}
          <span
            className="capitalize bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient"
            style={{ display: "inline-block" }}
          >
            {user.displayName ? user.displayName : "Dude"}
          </span>
          !!
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="flex gap-10 items-center p-5 bg-red-50 rounded-3xl shadow-md border-b-8 border-red-500">
          <FaUsers size={80} />
          <div>
            <p className="text-4xl font-bold">{data.donors}</p>{" "}
            <p className="text-xs">Donors</p>
          </div>
        </div>
        <div className="flex gap-10 items-center p-5 bg-red-50 rounded-3xl shadow-md border-b-8 border-red-500">
          <BiSolidDonateBlood size={80} />
          <div>
            <p className="text-4xl font-bold">{data.donationReq}</p>{" "}
            <p className="text-xs">Donation Requests</p>
          </div>
        </div>
        <div className="flex gap-10 items-center p-5 bg-red-50 rounded-3xl shadow-md border-b-8 border-red-500">
          <FaDonate size={80} />
          <div>
            <p className="text-4xl font-bold">${data.total}</p>{" "}
            <p className="text-xs">Funding</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerHome;
