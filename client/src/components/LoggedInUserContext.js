import React, { createContext, useState, useEffect } from "react";

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({ children }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  //handle form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentLoggedInUser");
    console.log("loggedInuser", loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentLoggedInUser(foundUser);
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
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};
