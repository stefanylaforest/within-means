import React, { createContext, useState, useEffect } from "react";

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({ children }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //handle form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentLoggedInUser");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      fetch(
        `https://secure-journey-19068.herokuapp.com/api/users/${foundUser._id}`
      )
        .then((rest) => rest.json())
        .then((json) => {
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          //send to error page
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
        updated,
        setUpdated,
        isLiked,
        setIsLiked,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};
