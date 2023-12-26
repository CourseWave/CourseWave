import React, { useState } from "react";
import { signupUserAsync } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import ForStudentForm from "../Assets/ForStudentForm.png";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,30}$/;

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
        "At least one lowercase letter, uppercase letter, digit,  special characters and Length between 6 and 30 characters";
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
      navigate(`/Login`);
    }
  };

  return (
    <div className="flex m-2">
      <div className="lg:w-1/2 w-full items-center hidden md:flex">
        <img src={ForStudentForm} alt="img" />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center items-center">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create your account
          </h2>
          <form className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-gray-700 text-sm font-bold mb-2"
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
              } rounded-md px-3 py-2`}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname}</p>
            )}

            <label
              htmlFor="lastname"
              className="text-gray-700 text-sm font-bold my-2"
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
              } rounded-md px-3 py-2`}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname}</p>
            )}

            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-bold my-2"
            >
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
              } rounded-md px-3 py-2`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-bold my-2"
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
              } rounded-md px-3 py-2`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-gray-700 font-bold my-2"
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
                <p className="text-red-500 text-sm">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <button
              type="button"
              className="bg-indigo-700 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
