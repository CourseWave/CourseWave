import React, { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>

      <ul className={`menu ${isDropdownOpen ? "open" : "closed"}`}>
        <li>
          <button onClick={toggleDropdown}>Users</button>
          <ul>
            <li>
              <button onClick={() => console.log("Teachers Table")}>
                Teachers Table
              </button>
            </li>
            <li>
              <button onClick={() => console.log("Students Table")}>
                Students Table
              </button>
            </li>
          </ul>
        </li>
        {/* Add other buttons as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
