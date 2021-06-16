import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Header from "./components/Header";
import UserDetails from "./components/UserDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyProfile from "./components/MyProfile";
import Offers from "./components/Offers";
import SignInHeader from "./components/SignInHeader";
import Saved from "./components/Saved";
import { LoggedInUserContext } from "./Context/LoggedInUserContext";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";

axios.defaults.baseURL = "https://withinmeans.herokuapp.com";
function App() {
  const { currentLoggedInUser } = useContext(LoggedInUserContext);

  return (
    <div>
      {currentLoggedInUser !== "" ? <Header /> : <SignInHeader />}

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
        <PrivateRoute exact path="/users/:userId/edit">
          <MyProfile />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:userId/offers">
          <Offers />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:userId/saved">
          <Saved />
        </PrivateRoute>
        <Route exact path="/search/:searchQuery">
          <SearchResults />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
