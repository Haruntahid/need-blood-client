import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function BloodDonationRequests() {
  const axiosPublic = useAxiosPublic();
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donation-req-pending"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-req");
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
      <div className="p-10 bg-gray-200 rounded-2xl mt-10">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          Blood Donation Request
        </h2>
      </div>
      <div className="flex flex-col mt-10">
        <div className="-mx-4 -my-2 overflow-x-auto lg:overflow-x-hidden">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Recipient Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Location</span>
                      </div>
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Time
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-bg-color divide-y divide-btn-color">
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="px-4 py-4 whitespace-nowrap capitalize">
                        {donation.recipient_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {donation.upazila},{donation.district}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                        {donation.date}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                        {donation.time}
                      </td>
                      <td className="px-8 py-4 text-sm whitespace-nowrap text-center">
                        <Link
                          to={`/donation-req-details/${donation._id}`}
                          className="px-5 py-2 rounded-full bg-red-400 hover:bg-red-600 text-white"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BloodDonationRequests;
