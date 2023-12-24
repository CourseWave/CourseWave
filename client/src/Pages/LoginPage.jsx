import React, { useState } from "react";
import { loginTrainerAsync, loginUserAsync } from "../Redux/UsersSlice";
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
    const loginAction =
      userType === "student" ? loginUserAsync : loginTrainerAsync;

    const result = await dispatch(loginAction({ email, password, userType }));

    if (result?.payload?.error) {
      setErrorMessage(result.payload.error);
      return;
    }

    Cookies.set("token", result.payload.token);
    Cookies.set("userInfo", JSON.stringify(result.payload));
    navigate("/");
    window.location.reload();
    console.log(result);
  };

  return (
    <div className="flex mt-10">
      <div className="w-1/2 flex items-center">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt=""
        />
      </div>
      <div className="w-1/2 flex justify-center items-center ">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Sign in to your account
          </h2>
          <form className="flex flex-col w-96">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md px-3 py-2 mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-3 py-2 mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex mb-4 justify-between p-2">
              <label className="text-gray-700 text-sm font-bold mb-2">
                Login As:
              </label>
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

            {errorMessage?.length > 0 && (
              <div className="text-red-700 mb-2">{errorMessage}</div>
            )}

            <button
              type="button"
              className="bg-indigo-700 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
