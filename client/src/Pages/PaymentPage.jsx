import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51OGNBPDlih6GygpiYrOv1hgRK6Y4AwH0RNTYKziZOdqTFmj79FBOZX9hxHQwE9NbJkx81ZSrk8qBuHKjkky68nGq00AwJL4G6X");

export default function StripeCheckout() {
const location = useLocation();

  const [clientSecret, setClientSecret] = useState("");
console.log(location);
  useEffect(() => {
    if(!location.state.amount){
      return;
    }
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: location.state.amount}),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
