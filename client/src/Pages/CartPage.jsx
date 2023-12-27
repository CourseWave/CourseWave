import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemsAsync, removeFromCartAsync } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

export const CartsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCourse = async (order_id) => {
    try {
      await dispatch(removeFromCartAsync(order_id));
    } catch (error) {
      console.error("Failed to remove course from cart:", error);
    }
  };

  useEffect(() => {
    dispatch(getCartItemsAsync());
  }, [dispatch]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, course) => total + course.total_amount * (course.quantity || 1),
      0
    );
  };

  const handleCheckout = (amount) => {
    if (!amount) {
      return;
    }

    // Redirect to the Payment Page  with the amount value
    navigate("/PaymentPage", { state: { amount } });
  };
  return (
    <>
      <div className="bg-white pt-20">
        <div className="flex flex-col justify-center items-center mb-9 text-black">
          <h1 className="font text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9">
            Cart Items
          </h1>
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="gap-6">
            {cartItems?.length > 0 &&
              cartItems.map((course) => (
                <div
                  key={course.order_id}
                  className="flex items-center bg-white flex-wrap border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 gap-2 mb-2"
                >
                  <img
                    src={encodeURI(
                      `http://localhost:5000/${course.course_image?.replace(
                        "\\",
                        "/"
                      )}`
                    )}
                    alt={course.course_title}
                    className="object-cover w-full lg:w-52 rounded-l-lg h-52 md:h-52"
                  />
                  <div className="flex flex-col justify-between p-4  leading-normal w-full lg:w-60 items-center">
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {course.course_title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-200">
                      ${course.total_amount}
                    </p>
                    <p className="mb-3 font-normal text-gray-200">
                      {/* Rating:{course.course.rate} */}
                    </p>
                    <div className="mt-10 ">
                      <button
                        onClick={() => removeCourse(course.order_id)}
                        className="cursor-pointer rounded-l w-36  bg-gray-100 py-1 px-3.5 duration-100 hover:scale-105 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-gray-800 p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-white">Order Summary</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold text-white">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold text-white">
                  $ {calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleCheckout(calculateTotal());
              }}
              disabled={calculateTotal() === 0}
              className="mt-6 w-full disabled:cursor-not-allowed disabled:bg-opacity-80 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 hover:scale-105 transition-all"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
