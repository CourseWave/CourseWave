import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { emptyStudent } from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [profileType, setProfileType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!user) return;
    let token = Cookies.get("userInfo");

    if (!token) return;

    token = JSON.parse(token);
    if (token.trainer) {
      setProfileType("/TeacherProfile");
      // setProfileType("");
    } else {
      console.log({ token });
      setProfileType("/StudentProfile");
    }
  }, [user]);

  useEffect(() => {
    const token = Cookies.get("token");
    token && setSignIn(true);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");

    navigate("/LoginPage");
    dispatch(emptyStudent());

    window.location.reload();
  };

  const navAfter = !signIn && (
    <>
      <Link
        to="/LoginPage"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00ffc2] md:p-0 dark:text-white md:dark:hover:text-[#00ffc2] dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Login
      </Link>
      <span className="text-white mx-2">|</span>
      <Link
        to="/RegistrationPage"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#00ffc2] md:p-0 dark:text-white md:dark:hover:text-[#00ffc2] dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Signup
      </Link>
    </>
  );

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            CourseWave
          </Link>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto  ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/LiveSessionPage"
                  className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                  aria-current="page"
                >
                  Live Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/CategoryPage"
                  className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                  aria-current="page"
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AboutUsPage"
                  className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/ContactUsPage"
                  className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                >
                  Contact Us
                </NavLink>
              </li>

              {navAfter}
              {signIn && (
                <>
                  {profileType !== "/TeacherProfile" && (
                    <NavLink
                      to="/CartsPage"
                      className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-cart w-6"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 1.9 1.61H18a2 2 0 0 0 1.9-1.39L23 6H6" />
                      </svg>
                    </NavLink>
                  )}

                  <NavLink
                    to="/Dashboard"
                    className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                  >
                    Dasboard
                  </NavLink>

                  <NavLink
                    to={profileType}
                    className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user w-7"
                    >
                      <circle cx="16" cy="16" r="15" />
                      <image
                        href="http://localhost:3000/static/media/heroSection.884c78f7234bff6065b1.png"
                        x="4"
                        y="4"
                        height="24"
                        width="24"
                        clipPath="url(#userClip)"
                      />
                      <defs>
                        <clipPath id="userClip">
                          <circle cx="16" cy="16" r="16" />
                        </clipPath>
                      </defs>
                    </svg>
                  </NavLink>
                </>
              )}
            </ul>
            {signIn && (
              <div className="absolute top-5 right-2">
                <button
                  title="Logout"
                  onClick={logout}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-red-500 md:dark:hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <svg
                    height="24"
                    width="24"
                    id="Capa_1"
                    fill="currentColor"
                    stroke="currentColor"
                    viewBox="0 0 55 55"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path d="M53.924,23.618c-0.051-0.123-0.125-0.234-0.217-0.327L41.708,11.293c-0.391-0.391-1.023-0.391-1.414,0 s-0.391,1.023,0,1.414L50.587,23H29.001c-0.553,0-1,0.447-1,1s0.447,1,1,1h21.586L40.294,35.293c-0.391,0.391-0.391,1.023,0,1.414 C40.489,36.902,40.745,37,41.001,37s0.512-0.098,0.707-0.293l11.999-11.999c0.093-0.092,0.166-0.203,0.217-0.326 C54.025,24.138,54.025,23.862,53.924,23.618z"></path>
                        <path d="M36.001,29c-0.553,0-1,0.447-1,1v16h-10V8c0-0.436-0.282-0.821-0.697-0.953L8.442,2h26.559v16c0,0.553,0.447,1,1,1 s1-0.447,1-1V1c0-0.553-0.447-1-1-1h-34c-0.032,0-0.06,0.015-0.091,0.018C1.854,0.023,1.805,0.036,1.752,0.05 C1.658,0.075,1.574,0.109,1.493,0.158C1.467,0.174,1.436,0.174,1.411,0.192C1.38,0.215,1.356,0.244,1.328,0.269 c-0.017,0.016-0.035,0.03-0.051,0.047C1.201,0.398,1.139,0.489,1.093,0.589c-0.009,0.02-0.014,0.04-0.022,0.06 C1.029,0.761,1.001,0.878,1.001,1v46c0,0.125,0.029,0.243,0.072,0.355c0.014,0.037,0.035,0.068,0.053,0.103 c0.037,0.071,0.079,0.136,0.132,0.196c0.029,0.032,0.058,0.061,0.09,0.09c0.058,0.051,0.123,0.093,0.193,0.13 c0.037,0.02,0.071,0.041,0.111,0.056c0.017,0.006,0.03,0.018,0.047,0.024l22,7C23.797,54.984,23.899,55,24.001,55 c0.21,0,0.417-0.066,0.59-0.192c0.258-0.188,0.41-0.488,0.41-0.808v-6h11c0.553,0,1-0.447,1-1V30 C37.001,29.447,36.553,29,36.001,29z"></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </>
  );
};

export default Navbar;
