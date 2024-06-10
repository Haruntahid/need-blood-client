import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

// publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

function Funding() {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      console.log(res.data);
      return res.data;
    },
  });

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Transaction ID copied to clipboard!");
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-500"></div>
      </div>
    );

  return (
    <>
      <Toaster />
      <div
        className="bg-no-repeat py-48 w-full mt-10 rounded-lg"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/pv2CT4w/Red-and-Green-Photo-Heavy-Fires-Crisis-Hub-Linked-In-Banner.png')",
        }}
      >
        <div className="text-right mr-36">
          <p className="text-3xl text-white mb-5">
            Contribute <span className="text-red-500 font-semibold">$10</span>{" "}
            to support our fund
          </p>
          <button
            className="btn bg-red-500 text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Give Donation
          </button>

          {/* modal */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box max-w-4xl p-10">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <h2 className="text-3xl font-bold text-red-500 mb-10 text-center">
                  Payment
                </h2>
                <Elements stripe={stripePromise}>
                  <CheckoutForm closeModal={closeModal} />
                </Elements>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="bg-red-100 rounded-2xl py-10">
        <h2 className="text-center text-5xl font-semibold text-red-500">
          All Donations
        </h2>
      </div>
      <div className="flex flex-col mt-10">
        <div className="-mx-4 -my-2 overflow-x-auto lg:overflow-x-hidden">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
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
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Donate Amount
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Payment Date
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                      Trx Id
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-bg-color divide-y divide-btn-color">
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-4 py-4 whitespace-nowrap capitalize">
                        {payment.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {payment.email}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                        <span className="text-green-500">${payment.price}</span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                        {payment.date}
                      </td>
                      <td className="px-8 py-4 text-sm whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <span className="px-5 py-2 bg-green-100 rounded-md text-green-500">
                            {payment.transactionId}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(payment.transactionId)
                            }
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <FaCopy className="h-5 w-5" />
                          </button>
                        </div>
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

export default Funding;
