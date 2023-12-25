import React from "react";
import StripeCheckout from "../Pages/StripeCheckout";

const Checkout = () => {
  return (
    <div className="text-white font-[700] text-opacity-90 h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="bg-white rounded-md bg-opacity-70">
        <StripeCheckout />
      </div>
    </div>
  );
};

export default Checkout;
