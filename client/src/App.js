import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Header from "./components/Header";
import UserDetails from "./components/UserDetails";
import { UsersContext } from "./components/UsersContext";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
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
