import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

function VolunteerAllBloodDonationReq() {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-donation-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-donation-req`);

      return res.data;
    },
  });

  // handle status update
  const handleStatusUpdate = (id) => {
    console.log(id);
    axiosSecure.patch(`/blood-req-status/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  if (isLoading) return <p>Loading..</p>;

  return (
    <>
      <h2 className="text-center text-5xl font-semibold text-red-500 mt-10">
        All Donation Request 2
      </h2>
      {donations.length > 0 ? (
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
                          <span>District</span>
                        </div>
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Upazila
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Details
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                        Action
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
                          {donation.district}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            {donation.upazila}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {donation.status}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <Link
                            to={`/dashboard/donation-details/${donation._id}`}
                            className="px-5 py-2 rounded-full bg-red-400 hover:bg-red-600 text-white"
                          >
                            View
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3 justify-center">
                          <button
                            onClick={() => handleStatusUpdate(donation._id)}
                            className="btn"
                          >
                            Mark as progress
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-5xl font-semibold text-red-300">
            No Donation request
          </p>
        </div>
      )}
    </>
  );
}

export default VolunteerAllBloodDonationReq;
