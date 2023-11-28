import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <p>&copy; 2023 Your Company</p>
            <p>About Us | Contact</p>
          </div>
          <div className="text-white">
            <a href="#" className="mr-4">Facebook</a>
            <a href="#" className="mr-4">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
