import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
        refetch();
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
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Active Role
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
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
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {user.role}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {user.status}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3 justify-center">
                        <button
                          onClick={() => handleStatus(user._id)}
                          className="btn text-xs max-w-18"
                        >
                          {user.status === "active" ? "Blocked" : "Unblocked"}
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
    </>
  );
}

export default AllUsers;
