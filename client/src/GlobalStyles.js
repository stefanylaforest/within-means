import { createGlobalStyle } from "styled-components";

export const colors = {
  darkPurple: "#4650E5",
  mediumPurple: "#8F90F2",
  navy: "#151627",
  coral: "#FF6C6C",
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: rgb(237, 238, 255); //temporary
    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, button {
    font-family: 'Comfortaa', cursive;
  }

  h1 {
    color: #151627;
  }

  p {
    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Poppins', sans-serif;
    color: #151627;
  }

  input {
    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Poppins', sans-serif;
  }

  ul {
      list-style: none;
      padding: 0;
      color: #151627;
  }
`;

export default GlobalStyles;
