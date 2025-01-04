import { useState } from "react";

function Search({ onSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
    onSearchQuery(e.target.value);
  }
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => handleSearchQuery(e)}
      className="p-1 bg-primary-100 rounded shadow-sm outline-none"
      placeholder="Search"
    />
  );
}

export default Search;
