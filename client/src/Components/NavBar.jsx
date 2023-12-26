import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  emptyStudent,
  fetchStudents,
  fetchTeachers,
} from "../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ProfileDropdown } from "./ProfileDropdown";

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
    const fetchData = async () => {
      try {
        await dispatch(fetchTeachers());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStudents());
      } catch (error) {
        console.log("Error fetching user data", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    let token = Cookies.get("userInfo");

    if (!token) return;

    token = JSON.parse(token);
    if (token.trainer) {
      setProfileType("/TeacherProfile");
    } else {
      if (token.user.role_id === 1) {
        setProfileType("admin");
      } else {
        setProfileType("/StudentProfile");
      }
    }
  }, [user]);

  useEffect(() => {
    const token = Cookies.get("token");
    token && setSignIn(true);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    dispatch(emptyStudent());
    window.location.reload();
  };

  const navAfter = !signIn && (
    <>
      <Link
        to="/Login"
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
                  {profileType === "/StudentProfile" && (
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

                  <ProfileDropdown logout={logout}>
                    <>
                      {profileType !== "/StudentProfile" && (
                        <NavLink
                          to="/Dashboard"
                          className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                        >
                          Dasboard
                        </NavLink>
                      )}
                      {profileType === "/StudentProfile" && (
                        <NavLink
                          to="/MyLearning"
                          className="block py-2 px-3 rounded hover:bg-transparent md:border-0 hover:text-[#00ffc2] md:p-0 text-white hover:bg-gray-700"
                        >
                          My Learning
                        </NavLink>
                      )}
                    </>
                  </ProfileDropdown>
                </>
              )}
            </ul>
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
