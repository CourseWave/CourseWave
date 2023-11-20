import React, { useState } from "react";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    degree: "",
    profession: "",
  });

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password  is required";
      isValid = false;
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm Password  is required";
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

    if (!formData.profession.trim()) {
      newErrors.profession = "Profession is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send registration data to backend or perform registration logic here
      console.log("Registration data:", formData);
    }
  };

  return (
    <div className="border p-5 shadow-xl">
      <h2 className="text-2xl font-bold mb-5 flex justify-center">Teacher SignUp</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`border ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-2">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`border ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-2">{errors.last_name}</p>
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

        <div>
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

        <div>
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

        <div>
          <label
            htmlFor="degree"
            className="block text-gray-700 font-bold mb-2"
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
            } rounded w-full py-2 px-3`}
          />
          {errors.degree && (
            <p className="text-red-500 text-sm mt-2">{errors.degree}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="profession"
            className="block text-gray-700 font-bold mb-2"
          >
            Field of Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={`border ${
              errors.profession ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.profession && (
            <p className="text-red-500 text-sm mt-2">{errors.profession}</p>
          )}
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
