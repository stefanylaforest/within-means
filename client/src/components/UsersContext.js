import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  //all the users
  const [users, setUsers] = useState([]);
  //matched users based on the query
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        // console.log("success", data);
        setUsers(json.data);
        setStatus("idle");
      });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        matchedUsers,
        setMatchedUsers,
        status,
        setStatus,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
