import React from "react";
import "./SearchBar.css";

const Searchbar = () => {
  return (
    <header className="searchbar">
      <input
        type="text"
        placeholder="Search for company, provider, user..."
      />
      <button>Search</button>
    </header>
  );
};

export default Searchbar;
