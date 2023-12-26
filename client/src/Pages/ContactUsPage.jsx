import React from "react";
import axios from "axios";
import ContactUs from "../Assets/ContactUs.png";

const ContactUsPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const response = await axios.post("http://example.com/api/contact", {
        fullName,
        email,
        message,
      });

      // Add any additional logic or UI changes upon successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors or show user-friendly messages
    }
  };

  return (
    <div className=" mx-auto mb-5">
      <div className="bg-gray-800 h-[30rem] text-white flex flex-col">
        <div className="flex justify-center flex-col lg:px-40 mx-5 mt-36">
          <h1 className="text-7xl md:text-8xl flex w-48 text-[#00ffc2]">Contact Us</h1>
          <img
            src={ContactUs}
            alt="img"
            className="hidden lg:w-80 md:w-72 md:h-72 lg:h-80 lg:top-[10rem] md:block md:absolute xl:h-[30rem] xl:w-[35rem] lg:right-[6rem] md:right-[2rem]  xl:top-[7rem]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-12 bg-">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="fullName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-gray-800 py-3 px-8 text-base font-semibold text-white outline-none hover:scale-105 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
