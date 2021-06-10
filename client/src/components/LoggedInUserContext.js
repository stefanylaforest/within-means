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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentLoggedInUser");
    console.log("loggedInuser", loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      fetch(`/api/users/${foundUser._id}`)
        .then((rest) => rest.json())
        .then((json) => {
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
          setFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};
