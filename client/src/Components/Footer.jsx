import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className=" bg-gray-800 p-4 bottom-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <p>&copy; 2023 Course Wave</p>
            <button
              className="mr-2"
              onClick={() => {
                navigate("/AboutUsPage");
              }}
            >
              About Us
            </button>
            |
            <button
              className="ml-2"
              onClick={() => {
                navigate("/ContactUsPage");
              }}
            >
              Contact
            </button>
          </div>
          <div className="text-white">
            <a href="#" className="mr-4">
              Facebook
            </a>
            <a href="#" className="mr-4">
              Twitter
            </a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
