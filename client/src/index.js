import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { UsersProvider } from "./components/UsersContext";

ReactDOM.render(
  <UsersProvider>
    <React.StrictMode>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </UsersProvider>,
  document.getElementById("root")
);
