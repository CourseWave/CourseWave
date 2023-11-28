import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastAlert = ({ type, content }) => {

  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(content);
        break;
      case "error":
        toast.error(content);
        break;
      case "info":
        toast.info(content);
        break;
      default:
        toast(content);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ToastAlert;
