import React from "react";

function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search trips or reviews..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{
        padding: "0.5rem 1rem",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
      }}
    />
  );
}

export default SearchBar;
