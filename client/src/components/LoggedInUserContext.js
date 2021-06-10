import React, { createContext, useState, useEffect } from "react";

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({ children }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [fetching, setFetching] = useState(true);
  //handle form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentLoggedInUser");
    console.log("loggedInuser", loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      fetch(`/api/users/${foundUser._id}`)
        .then((rest) => rest.json())
        .then((json) => {
          setFetching(false);
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updated]);

  return (
    <LoggedInUserContext.Provider
      value={{
        currentLoggedInUser,
        setCurrentLoggedInUser,
        loggedIn,
        setLoggedIn,
        errMsg,
        setErrMsg,
        email,
        setEmail,
        password,
        setPassword,
        fetching,
        setFetching,
        updated,
        setUpdated,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};
