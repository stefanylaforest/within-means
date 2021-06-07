import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import LoginSvg from "../assets/loginSvg";
import { LoggedInUserContext } from "./LoggedInUserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const {
    currentLoggedInUser,
    setCurrentLoggedInUser,
    loggedIn,
    setLoggedIn,
    errMsg,
    setErrMsg,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(LoggedInUserContext);
  let history = useHistory();

  const handleLoginFailure = (response) => {};

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
    })
      .then((response) => response.json())
      .then((json) => {
        setCurrentLoggedInUser(json.data);
        setLoggedIn(true);
        history.push(`/`);
      });
  };

  const regularLogInHandler = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
          history.push(`/`);
          return;
        } else if (json.status === 404) {
          setErrMsg("no account found with this email");
          setEmail("");
          setPassword("");
          return;
        } else if (json.status === 401) {
          setErrMsg("incorrect email or password");
          setEmail("");
          setPassword("");
          return;
        } else {
          setErrMsg("internal server error");
          return;
        }
      });
  };

  console.log("emai", email, "pw", password);
  console.log("errMsg", errMsg);
  console.log("logged in", loggedIn, "user:", currentLoggedInUser);

  return (
    <Container>
      <LogInModal>
        <h2>Log In</h2>

        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
        <LoginBtn type="submit" onClick={regularLogInHandler}>
          Log In
        </LoginBtn>
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
      <GraphicsDiv>
        <h1>
          Connect with real professionals and make your entrepreneurial journey
          less lonely
        </h1>
        <LoginSvg />
      </GraphicsDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const LogInModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  align-items: center;
  border-radius: 25px;
  margin: 100px;
  padding: 10px 10px;
`;

const GraphicsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const Input = styled.input`
  margin: 15px 0px;
  /* border: none; */
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
