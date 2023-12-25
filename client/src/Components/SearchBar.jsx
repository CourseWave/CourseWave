// SearchBar.js

import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, defaultValue, onValueChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  console.log({ searchTerm });
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="w-full" onSubmit={handleSearch}>
      <div className="relative text-gray-500 group">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
          <svg
            className="w-4 h-4 group-hover:text-white group-focus:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-md bg-transparent border-b-2 border-white hover:border-[#00ffc2] focus:border-[#00ffc2] focus:text-[#fff] ring-0 focus-visible:outline-none"
          placeholder="Search Mockups, Logos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onValueChange && onValueChange(e.target.value);
          }}
          required
          autoComplete={"off"}
        />
    
      </div>
    </form>
  );
};

export default SearchBar;
