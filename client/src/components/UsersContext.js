import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  //all the users
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState("loading");
  //matched users based on the query
  const [matchedUsers, setMatchedUsers] = useState([]);

  const [queryStatus, setQueryStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        // console.log("success", data);
        setUsers(json.data);
        setUserStatus("idle");
      });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        matchedUsers,
        setMatchedUsers,
        userStatus,
        setUserStatus,
        queryStatus,
        setQueryStatus,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
