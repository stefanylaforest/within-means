import React, { useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Header from "./components/Header";
import UserDetails from "./components/UserDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const location = useLocation();
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Signup />
        </Route>
        <Route exact path="/users/:userId">
          <UserDetails />
        </Route>
        <Route exact path="/search/:searchQuery">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
