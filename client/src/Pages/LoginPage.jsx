import React, { useState } from "react";
import { loginTrainerAsync, loginUserAsync } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

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

    window.location.reload();
  };
  if (isLoggedIn) {
    return null;
  }
  if (isLoggedIn === false)
    return (
      <div className="flex mt-10">
        <div className="lg:w-1/2 items-center w-full hidden md:flex">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt=""
          />
        </div>
        <div className="lg:w-1/2 flex justify-center items-center w-full">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Sign in to your account
            </h2>
            <form className="flex flex-col ">
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

              <div className="flex mb-4 items-center p-2">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Login As:
                </label>
                <div className="flex ml-5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="studentRadio"
                      value="student"
                      checked={userType === "student"}
                      onChange={() => setUserType("student")}
                      className="hidden"
                    />
                    <label
                      htmlFor="studentRadio"
                      className={`cursor-pointer p-2 border rounded-md  ${
                        userType === "student"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Student
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="teacherRadio"
                      value="teacher"
                      checked={userType === "teacher"}
                      onChange={() => setUserType("teacher")}
                      className="hidden"
                    />
                    <label
                      htmlFor="teacherRadio"
                      className={`cursor-pointer ml-0 p-2 border rounded-md  ${
                        userType === "teacher"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      Teacher
                    </label>
                  </div>
                </div>
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
