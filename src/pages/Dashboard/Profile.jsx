import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRegEdit } from "react-icons/fa";

function Profile() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  //   console.log(user.email);

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log(userData);
  if (isLoading) return <p>loading........</p>;

  return (
    <>
      <div className="p-10 bg-gray-200 rounded-2xl">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          Profile Information
        </h2>
        {/* profile section */}
        <div>
          <div className="flex justify-center mt-6">
            <img
              className="rounded-full border-2 border-red-500 p-2"
              src={userData.image}
              alt=""
            />
          </div>
          <div className="mt-6">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <FaRegEdit />
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Click the button below to close</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* user details */}
            <div className="">
              <p className="text-xl">Name: {userData.name}</p>
              <p className="text-xl">Email: {userData.email}</p>
              <p className="text-xl">
                Blood Group: <span>{userData.bloodGroup}</span>
              </p>
              <p className="text-xl">District: {userData.district}</p>
              <p className="text-xl">Upazila: {userData.upazila}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
