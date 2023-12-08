// Dashboard.js
import React, { useState, useRef, useEffect } from "react";
import TeachersTable from "../Components/TeachersTable";
import StudentsTable from "../Components/StudentsTable";
import CategoriesTable from "../Components/CategoriesTable";
import CoursesTable from "../Components/CoursesTable";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("teachers");

  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab.toLowerCase());
    setIsDropdownOpen(false); // Close dropdown when changing tabs
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`w-[15rem] h-[50rem] bg-gray-50 dark:bg-gray-900 p-10 ${
          isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <button
          type="button"
          className="sidebar-toggle text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        <ul className="space-y-2 font-medium">
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="menu-item text-white"
              onClick={toggleDropdown}
            >
              Users
            </button>
            {/* Dropdown content */}
            {isDropdownOpen && (
              <ul className="dropdown">
                <li
                  className={`cursor-pointer p-2 rounded-lg text-white ${
                    activeTab === "teachers"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleTabChange("teachers")}
                >
                  Teachers
                </li>
                <li
                  className={`cursor-pointer p-2 rounded-lg text-white ${
                    activeTab === "students"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleTabChange("students")}
                >
                  Students
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              className={`menu-item text-white ${
                activeTab === "Categories"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("Categories")}
            >
              Categories
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`menu-item text-white ${
                activeTab === "courses"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("courses")}
            >
              Courses
            </button>
          </li>
          {/* Add other buttons as needed */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "teachers" && <TeachersTable />}
        {activeTab === "students" && <StudentsTable />}
        {activeTab === "categories" && <CategoriesTable />}{" "}
        {/* Updated condition */}
        {activeTab === "courses" && <CoursesTable />} {/* Updated condition */}
        {/* Add other content based on the active tab */}
      </main>
    </div>
  );
};

export default Dashboard;
