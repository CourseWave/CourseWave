import React, { useState } from "react";
import { signupUserAsync } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const nameRegex = /^[a-zA-Z]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,30}$/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!nameRegex.test(formData.firstname.trim())) {
      newErrors.firstname = "First Name is required";
      isValid = false;
    }

    if (!nameRegex.test(formData.lastname.trim())) {
      newErrors.lastname = "Last Name is required";
      isValid = false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!passwordRegex.test(formData.password.trim())) {
      newErrors.password =
        "Password is required and must meet the specified criteria";
      isValid = false;
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(signupUserAsync(formData));
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      setErrors({});
    } 
  };

  return (
    <div className="border p-5 shadow-xl">
      <h2 className="text-2xl font-bold mb-5 flex justify-center">Student SignUp</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="">
          <label
            htmlFor="firstname"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={`border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-2">{errors.firstname}</p>
          )}
        </div>
        <div className="">
          <label
            htmlFor="lastname"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`border ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-2">{errors.lastname}</p>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className={`border ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirm_password}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-[#0F2355] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
