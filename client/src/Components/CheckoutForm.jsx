import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { checkoutAsync } from "../Redux/CheckoutSlice";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setMessage(
        paymentIntent.status === "succeeded"
          ? "Your payment succeeded"
          : "Unexpected error occurred"
      );
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  const handlePaynowClick = async (e) => {
    e.preventDefault();
        try {
      await dispatch(checkoutAsync());
            setMessage("Payment successful!"); 
    } catch (error) {
      setMessage("Error processing payment. Please try again."); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-black mb-4">Complete your payment here!</p>
      <PaymentElement />
      <button
        className="bg-black rounded-xl text-white p-2 mt-6 mb-2"
        disabled={isLoading || !stripe || !elements}
        onClick={handlePaynowClick}
      >
        {isLoading ? "Loading..." : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default CheckoutForm;
