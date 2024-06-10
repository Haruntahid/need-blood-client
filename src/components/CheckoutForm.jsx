import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function CheckoutForm({ closeModal }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const price = 10;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      console.log(paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        // setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          name: user.displayName,
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: moment().format("L"), // utc date convert. use moment js to
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        if (res.data.insertedId) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Thank you for the Donation",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/funding");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <p className="my-2 text-[#aab7c4]">Your Card Info</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",

                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",

                iconColor: "#fa755a",
              },
            },
          }}
          className="p-3 border border-gray-200 rounded-lg"
        />
        <div className="my-5 text-red-500">{error && <p>{error}</p>}</div>
        <div className="mt-10 text-center">
          <button
            disabled={!stripe || !clientSecret}
            type="submit"
            className="px-10 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
