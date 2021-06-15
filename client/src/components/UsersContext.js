import React, { createContext, useContext, useState, useEffect } from "react";

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
        const sortUsersByMostRecentStatus = json.data.sort((a, b) => {
          let dateTwo = Date.parse(a.statusDate);
          let dateOne = Date.parse(b.statusDate);
          return dateOne - dateTwo;
        });
        setUsers(sortUsersByMostRecentStatus);
        setUserStatus("idle");
      });
  }, [users.statusDate, users.status]);

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
