// LoginPage.jsx
import React, { useState } from "react";
import { loginTrainerAsync, loginUserAsync, setUserState } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userType === "student") {
      const result = await dispatch(
        loginUserAsync({ email, password, userType })
      );
      if (result?.payload?.error) {
        setErrorMessage(result.payload.error);
        return;
      }
      Cookies.set("token", result.payload.token);
      Cookies.set("userInfo", JSON.stringify(result.payload));
      navigate("/");
      window.location.reload();
      console.log(result);
    }else{
      const result = await dispatch(
        loginTrainerAsync({ email, password, userType })
      );
      if (result?.payload?.error) {
        setErrorMessage(result.payload.error);
        return;
      }
      Cookies.set("token", result.payload.token);
      Cookies.set("userInfo", JSON.stringify(result.payload));
      navigate("/");
      window.location.reload();
      console.log(result);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md px-3 py-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-3 py-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Login As:
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  value="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={() => setUserType("teacher")}
                />
                Teacher
              </label>
            </div>
          </div>
          {errorMessage?.length > 0 && (
            <div className="text-red-700 mb-2">{errorMessage}</div>
          )}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
