import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoggedInUserContext } from "./LoggedInUserContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentLoggedInUser } = useContext(LoggedInUserContext);
  return (
    <Route
      {...rest}
      children={(props) => {
        return currentLoggedInUser ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
