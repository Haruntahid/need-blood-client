import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDonate, FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

function AdminHome() {
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

  if (isLoading) return <p>Loading......</p>;
  return (
    <>
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
        <div className="flex gap-6 items-center p-5 bg-red-50 rounded-2xl">
          <FaUsers size={80} />
          <div>
            <p className="text-3xl font-bold">{data.donors}</p>{" "}
            <p className="text-xs">Donors</p>
          </div>
        </div>
        <div className="flex gap-6 items-center p-5 bg-red-50 rounded-2xl">
          <BiSolidDonateBlood size={80} />
          <div>
            <p className="text-3xl font-bold">{data.donationReq}</p>{" "}
            <p className="text-xs">Donation Requests</p>
          </div>
        </div>
        <div className="flex gap-6 items-center p-5 bg-red-50 rounded-2xl">
          <FaDonate size={80} />
          <div>
            <p className="text-3xl font-bold">00</p>{" "}
            <p className="text-xs">Funding</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
