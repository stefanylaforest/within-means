import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";

const SearchResults = () => {
  const { matchedUsers, setMatchedUsers } = useContext(UsersContext);
  console.log(matchedUsers);

  return <div></div>;
};

export default SearchResults;
