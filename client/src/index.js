import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { UsersProvider } from "./components/UsersContext";
import { SearchProvider } from "./components/SearchContext";

ReactDOM.render(
  <SearchProvider>
    <UsersProvider>
      <React.StrictMode>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </UsersProvider>
  </SearchProvider>,
  document.getElementById("root")
);
