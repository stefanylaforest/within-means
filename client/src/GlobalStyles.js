import { createGlobalStyle } from "styled-components";

export const colors = {
  darkPurple: "#4650E5",
  mediumPurple: "#8F90F2",

  navy: "#151627",
  // coral: "#FF6C6C",
  coral: "#ff5757",
};

const GlobalStyles = createGlobalStyle`

*,
  *:before,
  *:after {
      scroll-behavior: smooth;
  }


  body {
    margin: 0;
    padding: 0;
    background: rgb(237, 238, 255); 
    font-family: 'Poppins', sans-serif;

    


  }

  

  h1, h2, h3, h4, h5, h6, button {
    font-family: 'Comfortaa', cursive;
  }

  h1 {
    color: #151627;
  }

  p, textarea {
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


  a {
    text-decoration: none;
    color: ${colors.navy}
  }

  button {
    transition: 0.3s ease-in-out;
  }
`;

export default GlobalStyles;
