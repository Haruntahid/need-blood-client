import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  const handleStatus = (id) => {
    console.log(id);
    axiosSecure.patch(`/status/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Status Successfully Updated!");
        refetch();
      }
    });
  };

  const handleRole = (id, newRole) => {
    console.log(id, newRole);
    axiosSecure.patch(`/role/${id}`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          All Users
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
                        <span>Image</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                      Active Role
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                      Action
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 text-center">
                      Premission
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-bg-color divide-y divide-btn-color">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-4 whitespace-nowrap capitalize">
                        <img
                          className="w-16 h-16 object-cover rounded-full"
                          src={user.image}
                          alt=""
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                        <span
                          className={`px-6 py-1 rounded-full ${
                            user.role === "Admin"
                              ? "bg-green-100 text-green-500"
                              : user.role === "Donor"
                              ? "bg-blue-100 text-blue-500"
                              : user.role === "Volunteer"
                              ? "bg-purple-100 text-purple-500"
                              : ""
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span
                          className={`flex justify-center items-center gap-2 px-6 py-1 rounded-full text-${
                            user.status === "active" ? "green" : "red"
                          }-500`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full ${
                              user.status === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap gap-3 text-center">
                        <button
                          onClick={() => handleStatus(user._id)}
                          className={`px-5 py-2 rounded-md min-w-28 text-xs ${
                            user.status === "active"
                              ? "bg-red-500 text-white hover:bg-red-700"
                              : "bg-green-500 text-white hover:bg-green-700"
                          }`}
                        >
                          {user.status === "active" ? "Blocked" : "Unblocked"}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap gap-3 text-center">
                        <select
                          value={user.role}
                          onChange={(e) => handleRole(user._id, e.target.value)}
                          className="text-xs border border-gray-500 bg-red-50 rounded-md px-2 py-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Donor">Donor</option>
                          <option value="Volunteer">Volunteer</option>
                        </select>
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

export default AllUsers;
