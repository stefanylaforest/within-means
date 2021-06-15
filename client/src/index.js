import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { UsersProvider } from "./Context/UsersContext";
import { SearchProvider } from "./Context/SearchContext";
import { LoggedInUserProvider } from "./Context/LoggedInUserContext";

ReactDOM.render(
  <LoggedInUserProvider>
    <SearchProvider>
      <UsersProvider>
        <React.StrictMode>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </UsersProvider>
    </SearchProvider>
  </LoggedInUserProvider>,
  document.getElementById("root")
);
