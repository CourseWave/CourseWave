// SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Pass the search term to the parent component for handling
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search courses..."
        className="border px-2 py-1 rounded-full md:w-[45rem] sm::w-[30rem] w-full h-[3rem]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-[#0F2355] text-white px-4 py-2 rounded-full"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
