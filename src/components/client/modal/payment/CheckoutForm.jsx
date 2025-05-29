import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../pages/hooks/useAxiosPublic";
import { message as antMessage } from 'antd';
import axios from "axios";

const CheckoutForm = ({ clientSecret, userDetails, paymentId }) => {
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(`checkout page clientSecret is ${clientSecret}`);
  console.log(`checkout page paymentId is ${paymentId}`);

  const handlePaypalPayment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://137.59.180.219:8000/api/create-paypal-payment-intent?amount=${userDetails.amount}&currency=USD`
      );

      const approvalLink = res?.data?.approve_link;

      if (approvalLink) {
        window.location.href = approvalLink;
      } else {
        console.error("PayPal approval link not found in response.");
      }
    } catch (error) {
      console.error("Error creating PayPal payment intent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setMessage("Stripe not loaded yet.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href, // Optional: redirect on success
        },
        redirect: "if_required",
      });

      console.log("Stripe confirm result:", error, paymentIntent);

      if (error) {
        setMessage(error.message ?? "An unexpected error occurred.");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const res = await axiosPublic.post(`/donate-money`, {
          transaction_id: paymentId,
          payment_type: userDetails.payment_type,
          donation_type: userDetails?.donation_type,
          frequency: userDetails?.frequency,
          name: userDetails?.name,
          email: userDetails?.email,
          remark: userDetails?.remark,
          amount: userDetails?.amount,
          phone_number: userDetails?.phone_number,
          payment_gatway: "stripe",
        });

        console.log("Donation recorded:", res);
        navigate("/");
        return antMessage.success("Donation successful.");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setMessage("Something went wrong while processing your payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full border p-6 rounded-md shadow-md bg-white flex flex-col gap-4"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Card Details
          </label>
          <div className="p-2 border rounded">
            <PaymentElement />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full sm:w-[200px] bg-[#403730] hover:bg-[#27221D] py-3 text-white font-bold rounded-md"
        >
          {isLoading ? "Processing..." : "Payment Now"}
        </button>

        {message && (
          <div className="text-red-500 text-center mt-2">{message}</div>
        )}
      </form>

      <button
        disabled={loading}
        onClick={handlePaypalPayment}
        className="w-full sm:w-[200px] bg-[#403730] hover:bg-[#27221D] py-3 text-white font-bold rounded-md my-5 ml-7"
      >
        {loading ? "Processing..." : "Paypal payment"}
      </button>
    </div>
  );
};

export default CheckoutForm;
