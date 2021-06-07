import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

const Login = () => {
  const handleLoginSuccess = (response) => {
    console.log(response);
    fetch("/api/googlelogin", {
      method: "POST",
      body: JSON.stringify({
        token: response.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };

  const handleLoginFailure = (response) => {};

  // const regularLogInHandler = () => {
  //   fetch("/api/login", {
  //     method: "POST",
  //     body: JSON.stringify({ status: state }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => response.json());
  // };

  return (
    <Container>
      <LogInModal>
        <h2>Log In</h2>

        <Input type="email" />
        <Input type="password" />
        <LoginBtn type="submit">Sign In</LoginBtn>
        <Seperator>or</Seperator>
        <GoogleLogin
          // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          clientId="17624572290-erpuh9siuiimc5pemsfpinsi5mg0jekb.apps.googleusercontent.com"
          // render={(renderProps) => (
          //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          //     Login with Google
          //   </button>
          // )}
          buttonText="Continue with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      </LogInModal>
      <GraphicsDiv></GraphicsDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LogInModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GraphicsDiv = styled.div`
  width: 100%;
`;

const Input = styled.input`
  margin: 15px 0px;
  border: none;
  font-size: 18px;
`;

const LoginBtn = styled.button`
  font-size: 18px;
`;

const Seperator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: gray;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid gray;
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-right: 0.25em;
  }
`;

export default Login;
