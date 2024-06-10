// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Link } from "react-router-dom";
// import { IoTrash } from "react-icons/io5";
// import Swal from "sweetalert2";
// import { FaRegEdit } from "react-icons/fa";

// function DonationRequest() {
//   const { user, loading } = useAuth();
//   const axiosPublic = useAxiosPublic();

//   const {
//     data: donations = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["donation-request", user?.email],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/donation-request/${user?.email}`);
//       return res.data;
//     },
//   });

//   // handle delete btn
//   const handleDelete = (id) => {
//     console.log("deleted", id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosPublic.delete(`/donation-request/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             });
//           }
//         });
//       }
//     });
//   };

//   // update donation status
//   const handleUpdateStatus = (id, status) => {
//     console.log(id, status);
//     axiosPublic.patch(`/blood-status/${id}`, { status }).then((res) => {
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           title: "Updated!",
//           text: `The status has been updated to ${status}.`,
//           icon: "success",
//         });
//       }
//     });
//   };

//   if (loading || isLoading)
//     return (
//       <div className="flex justify-center items-center h-[80vh]">
//         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
//       </div>
//     );

//   return (
//     <>
//       <div className="p-10 bg-gray-200 rounded-2xl">
//         <h2 className="text-center text-5xl font-semibold text-red-500">
//           All Donation Request
//         </h2>
//       </div>
//       {donations.length > 0 ? (
//         <div className="flex flex-col mt-10">
//           <div className="-mx-4 -my-2 overflow-x-auto lg:overflow-x-hidden">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden border border-gray-200  md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
//                       >
//                         <div className="flex items-center gap-x-3">
//                           <span>Recipient Name</span>
//                         </div>
//                       </th>
//                       <th
//                         scope="col"
//                         className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
//                       >
//                         <div className="flex items-center gap-x-3">
//                           <span>District</span>
//                         </div>
//                       </th>
//                       <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
//                         Upazila
//                       </th>
//                       <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
//                         Status
//                       </th>
//                       <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
//                         Details
//                       </th>
//                       {donations.some(
//                         (donation) => donation.status === "in progress"
//                       ) && (
//                         <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
//                           Progress Action
//                         </th>
//                       )}
//                       <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-bg-color divide-y divide-btn-color">
//                     {donations.map((donation) => (
//                       <tr key={donation._id}>
//                         <td className="px-4 py-4 whitespace-nowrap capitalize">
//                           {donation.recipient_name}
//                         </td>
//                         <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
//                           {donation.district}
//                         </td>
//                         <td className="px-4 py-4 text-sm whitespace-nowrap">
//                           <div className="flex items-center gap-x-2">
//                             {donation.upazila}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 text-center text-sm whitespace-nowrap">
//                           <p
//                             className={`rounded-full px-4 py-1 inline-block ${
//                               donation.status === "pending"
//                                 ? "bg-yellow-100 text-yellow-500"
//                                 : donation.status === "in progress"
//                                 ? "bg-blue-100 text-blue-500"
//                                 : donation.status === "done"
//                                 ? "bg-green-100 text-green-500"
//                                 : donation.status === "canceled"
//                                 ? "bg-red-100 text-red-500"
//                                 : ""
//                             }`}
//                           >
//                             <span className="capitalize">
//                               {donation.status}
//                             </span>
//                           </p>
//                         </td>
//                         <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
//                           <Link
//                             to={`/dashboard/donation-details/${donation._id}`}
//                             className="px-5 py-2 rounded-full bg-red-400 hover:bg-red-600 text-white"
//                           >
//                             View
//                           </Link>
//                         </td>
//                         <td className="px-4 py-4 text-sm whitespace-nowrap gap-3 text-center">
//                           {donation.status === "in progress" ? (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   handleUpdateStatus(donation._id, "done")
//                                 }
//                                 className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 mr-4 text-white"
//                               >
//                                 Done
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleUpdateStatus(donation._id, "canceled")
//                                 }
//                                 className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
//                               >
//                                 Cancel
//                               </button>
//                             </>
//                           ) : (
//                             <span>Waiting for Response</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-4 text-sm whitespace-nowrap gap-3 text-center">
//                           <Link
//                             to={`/dashboard/update-donation/${donation._id}`}
//                             className="btn bg-blue-500 hover:bg-blue-700 mr-3"
//                           >
//                             <FaRegEdit size={25} color="#fff" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(donation._id)}
//                             className="btn bg-red-500 hover:bg-red-700"
//                           >
//                             <IoTrash size={25} color="#fff" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-[50vh]">
//           <p className="text-5xl font-semibold text-red-300">
//             You have No Donation request
//           </p>
//         </div>
//       )}
//     </>
//   );
// }

// export default DonationRequest;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";

function DonationRequest() {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-request", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donation-request/${user?.email}`);
      return res.data;
    },
  });

  // handle delete btn
  const handleDelete = (id) => {
    console.log("deleted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/donation-request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // update donation status
  const handleUpdateStatus = (id, status) => {
    console.log(id, status);
    axiosPublic.patch(`/blood-status/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Updated!",
          text: `The status has been updated to ${status}.`,
          icon: "success",
        });
      }
    });
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );

  return (
    <>
      <div className="p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          All Donation Request
        </h2>
      </div>
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
                      <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                        Details
                      </th>
                      {donations.some(
                        (donation) => donation.status === "in progress"
                      ) && (
                        <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                          Progress Action
                        </th>
                      )}
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
                        <td className="px-4 py-4 text-center text-sm whitespace-nowrap">
                          <p
                            className={`rounded-full px-4 py-1 inline-block ${
                              donation.status === "pending"
                                ? "bg-yellow-100 text-yellow-500"
                                : donation.status === "in progress"
                                ? "bg-blue-100 text-blue-500"
                                : donation.status === "done"
                                ? "bg-green-100 text-green-500"
                                : donation.status === "canceled"
                                ? "bg-red-100 text-red-500"
                                : ""
                            }`}
                          >
                            <span className="capitalize">
                              {donation.status}
                            </span>
                          </p>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                          <Link
                            to={`/dashboard/donation-details/${donation._id}`}
                            className="px-5 py-2 rounded-full bg-red-400 hover:bg-red-600 text-white"
                          >
                            View
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                          {donation.status === "in progress" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(donation._id, "done")
                                }
                                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 mr-4 text-white"
                              >
                                Done
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(donation._id, "canceled")
                                }
                                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
                              >
                                Cancel
                              </button>
                            </>
                          ) : donation.status === "pending" ? (
                            <span>Waiting for Response</span>
                          ) : (
                            <span>Action Disabled</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap gap-3 text-center">
                          <Link
                            to={`/dashboard/update-donation/${donation._id}`}
                            className={`btn ${
                              donation.status === "pending"
                                ? "bg-blue-500 hover:bg-blue-700"
                                : "bg-blue-300 cursor-not-allowed"
                            } mr-3`}
                            disabled={donation.status !== "pending"}
                          >
                            <FaRegEdit size={25} color="#fff" />
                          </Link>
                          <button
                            onClick={() => handleDelete(donation._id)}
                            className={`btn ${
                              donation.status === "pending"
                                ? "bg-red-500 hover:bg-red-700"
                                : "bg-red-300 cursor-not-allowed"
                            }`}
                            disabled={donation.status !== "pending"}
                          >
                            <IoTrash size={25} color="#fff" />
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
            You have No Donation request
          </p>
        </div>
      )}
    </>
  );
}

export default DonationRequest;
