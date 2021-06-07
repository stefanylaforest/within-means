import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  //all the users
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState("loading");
  //matched users based on the query

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
        setUserStatus("idle");
      });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        userStatus,
        setUserStatus,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
