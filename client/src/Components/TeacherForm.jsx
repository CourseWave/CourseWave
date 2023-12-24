import React, { useState } from "react";
import { signupTrainerAsync } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import ForTeacherForm from "../Assets/ForTeacherForm.png";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    degree: "",
    field: "",
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
        "Password is required and must meet the specified criteria";
      isValid = false;
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      isValid = false;
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
      isValid = false;
    }

    if (!formData.field.trim()) {
      newErrors.field = "Field of Profession is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signupTrainerAsync(formData));
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        degree: "",
        field: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="flex m-2 ">
      <div className="w-1/2 flex justify-center items-center">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create your teacher account
          </h2>
          <form className="flex flex-col w-96">
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="firstname"
                  className="text-gray-700 text-sm font-bold mb-2 block"
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
                  } rounded-md px-3 py-2 w-full`}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastname"
                  className="text-gray-700 text-sm font-bold mb-2 block"
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
                  } rounded-md px-3 py-2 w-full`}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
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
                } rounded w-full py-2 px-3`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1">
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
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex-1">
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
                    errors.confirm_password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded w-full py-2 px-3`}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirm_password}
                  </p>
                )}
              </div>
            </div>

            <label
              htmlFor="degree"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Degree
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className={`border ${
                errors.degree ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 mb-4`}
            />
            {errors.degree && (
              <p className="text-red-500 text-sm mt-2">{errors.degree}</p>
            )}

            <label
              htmlFor="field"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Field of Profession
            </label>
            <input
              type="text"
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className={`border ${
                errors.field ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 mb-4`}
            />
            {errors.field && (
              <p className="text-red-500 text-sm mt-2">{errors.field}</p>
            )}

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
      <div className="w-1/2 flex items-center">
        <img src={ForTeacherForm} alt="Teacher Form" />
      </div>
    </div>
  );
};

export default TeacherForm;
