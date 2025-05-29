import {
  useElements,
  PaymentElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card, Button, Descriptions, Divider } from "antd";

import React, { useState } from "react";

const BitCheckoutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/succeeded",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };




  return (
    <div className="   ">
      <div className="  ">
        
        <form
          id="payment-form"
          className="  "
          onSubmit={handleSubmit}
        >
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span className="block mx-auto border my-5 " id="button-text  ">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                <button className=" bg-[#403730] hover:bg-[#27221D] w-[130px]  block mx-auto  py-3 text-white font-bold rounded-md  ">
                  Payment Now
                </button>
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default BitCheckoutFrom;
