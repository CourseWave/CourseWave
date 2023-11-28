import React from 'react';
import axios from 'axios';
import Hero from "../Assets/Hero.png";

const ContactUsPage = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const message = formData.get('message');
    
        try {
          const response = await axios.post('http://example.com/api/contact', {
            fullName,
            email,
            message,
          });
    
          console.log('Form submitted successfully:', response.data);
          // Add any additional logic or UI changes upon successful submission
        } catch (error) {
          console.error('Error submitting form:', error);
          // Handle errors or show user-friendly messages
        }
      };

  return (
    <div className=" mx-auto bg-[#6F97FF] mb-5">
      <div className="flex justify-center items-center mb-8">
        <img src="" alt="Contact" className="w-full h-auto" />
      </div>
      <div className=''>
        <h2 className='text-center mb-5 font-bold text-3xl text-white'>Do You Require assistance</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto  border-2  border-black p-5 rounded-[1rem] bg-white drop-shadow-2xl">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full border-2 border-[#6F97FF] p-2  rounded-[1rem]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2 ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border-2 border-[#6F97FF] p-2  rounded-[1rem]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border-2 border-[#6F97FF] rounded-[1rem]"
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0F2355] hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline-blue rounded-[1rem]"
          >
            Send
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
