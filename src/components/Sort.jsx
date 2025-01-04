import React from "react";
import { useSearchParams } from "react-router-dom";

function Sort({ sortBy, onSort }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <select
      value={searchParams.get("sort") || "none"}
      onChange={(e) => onSort(e.target.value)}
      className="bg-primary-100 p-1 rounded "
    >
      <option value="none">Sort by</option>
      <option value="name">Name</option>
      <option value="progress">Progress</option>
    </select>
  );
}

export default Sort;
