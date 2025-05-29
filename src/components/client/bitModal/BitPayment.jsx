import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import React, { useEffect, useState } from "react";
import CheckoutForm from "../modal/payment/CheckoutForm";
import BitCheckoutFrom from "./BitCheckoutFrom";
const stripePromise = loadStripe(
  "pk_test_51RCsN4GheeTFBgpkrJvnRLxtTIF7HyELpY1MF8bFVT98mdBfwbNOLPfLZIaVv5lXCM9fQsja7M6m2mgh3oLI8jh800gaNGnv0m"
);

const BitPayment = () => {
  const price = 100;
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://137.59.180.219:5000/api/v1/create-payment-inten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div className=" max-w-[1216px] mx-auto py-28 ">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <BitCheckoutFrom/>
        </Elements>
      )}
    </div>
  );
};

export default BitPayment;
