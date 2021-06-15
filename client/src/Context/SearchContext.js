import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [queryStatus, setQueryStatus] = useState("loading");
  const [matchedUsers, setMatchedUsers] = useState([]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        matchedUsers,
        setMatchedUsers,
        queryStatus,
        setQueryStatus,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
