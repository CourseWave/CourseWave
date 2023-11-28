import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../Redux/CartSlice";

export const CartsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeCourse = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  useEffect(() => {
    // Fetch cart items or update them from your API here if needed
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, course) => total + course.course_price * (course.quantity || 1), 0);
  };

  return (
    <>
      <div className="bg-white pt-20">
        <div className="flex flex-col justify-center items-center mb-9">
          <h1 className="font text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 dark:text-white">
            Cart Items
          </h1>
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((course) => (
              <div
                key={course.course_id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between ">
                  <div className="mt-5 sm:mt-0 ">
                    <img
                      src={course.course_image}
                      alt={course.course_title}
                      className="w-52 object-cover rounded-md"
                    />
                    <h2 className="text-lg font-bold text-gray-900">{course.course_title}</h2>
                  </div>
                  <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        onClick={() => removeCourse(course.course_id)}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-indigo-900 hover:text-blue-50"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm"> ${course.course_price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Order Summary</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">$ {calculateTotal().toFixed(2)}</p>
              </div>
            </div>

            <Link to="/PaymentPage" state={{amount:calculateTotal()}}>
              <button className="mt-6 w-full rounded-md bg-indigo-900 py-1.5 font-medium text-blue-50 hover:bg-indigo-950">
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
