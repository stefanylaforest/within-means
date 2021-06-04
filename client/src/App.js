import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search-results">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
