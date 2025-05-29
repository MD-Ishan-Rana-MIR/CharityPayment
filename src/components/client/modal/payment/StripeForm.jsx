import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../pages/hooks/useAxiosPublic";

// Your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51RLzuUIhiULC1yH1gy4jvSMN6O2fD12JG5XTSgOkBp23Y8RU9ulC04BeQbQPV74II3tFKL80MNv8T7cdZcsw8zCx00amoqzOkX"
);

const StripeForm = () => {
  const location = useLocation();
  const userPayload = location.state;
  const userDetails = {
    amount: Number(userPayload.amount),
    donation_type: userPayload.donation_type,
    email: userPayload.email,
    frequency: userPayload.frequency,
    name: userPayload.name,
    payment_type: userPayload.payment_type,
    remark: userPayload.remark
  }
  console.log(typeof `stripe from payload is ${userDetails.amount}`);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("")
  useEffect(() => {
    if (!userPayload.amount) {
      navigate("/user-details");
      return;
    }

    const url = `http://137.59.180.219:8000/api/create-payment-intent?amount=${userPayload.amount}&payment_method=pm_card_visa`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // No body needed for this API
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data?.data?.client_secret);
        setPaymentId(data?.data?.id)
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, [userPayload.amount]);



  console.log(`payment id is ${paymentId}`)


  const appearance = {
    theme: "stripe",
  };

  return (
    <div className="max-w-[600px] mx-auto py-28 ">
      {clientSecret ? (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm paymentId={paymentId} userDetails={userDetails} clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p className="text-center">Loading payment form...</p>
      )}
    </div>
  );
};

export default StripeForm;
