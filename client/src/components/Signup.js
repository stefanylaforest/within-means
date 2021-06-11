import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import LoginSvg from "../assets/loginSvg";
import { LoggedInUserContext } from "./LoggedInUserContext";
import { useHistory } from "react-router-dom";
import { colors } from "../GlobalStyles";
import Loading from "./Loaders/Loading";

const Signup = () => {
  const [loadingComponent, setLoadingComponent] = useState(false);
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

  const handleLoginSuccess = async (response) => {
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
        //200 === user already exists
        if (json.status === 200) {
          history.push(`/login`);
          setErrMsg("user already exists, please log in");
        }
        //200 === user doesn't exists
        if (json.status === 201) {
          setErrMsg("");
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
          history.push(`/users/${currentLoggedInUser._id}/edit`);
        }
      });
  };

  const regularSignUpHandler = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      return setErrMsg("Please enter a valid email address");
    } else if (email.length === 0) {
      return setErrMsg("Please enter an email");
    } else if (password.length === 0) {
      return setErrMsg("Please enter a password");
    }

    fetch("/api/register", {
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
          history.push(`/users/${currentLoggedInUser._id}/edit`);
        }

        if (json.status === 401) {
          return setErrMsg(json.message);
        }

        if (json.status === 500) {
          return setErrMsg("Internal server error");
        }
      });
  };

  if (loadingComponent) {
    return <Loading />;
  } else {
    return (
      <Container>
        <SignUpModal>
          <h2>Sign Up To Within Means</h2>
          {errMsg !== "" && <ErrorMessage>{errMsg}</ErrorMessage>}
          <Label for="password">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMsg("");
            }}
          />
          <Label for="password">Password</Label>
          <Input
            type="password"
            placeholder="Your Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrMsg("");
            }}
          />
          <SignUpBtn type="submit" onClick={regularSignUpHandler}>
            Sign Up
          </SignUpBtn>
          <Seperator>or</Seperator>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
          <SignUp>
            Already a member?{" "}
            <StyledLink exact to="/login">
              Log In
            </StyledLink>
          </SignUp>
        </SignUpModal>
        <GraphicsDiv>
          <h1>
            Connect with real professionals and make your entrepreneurial
            journey less lonely
          </h1>
          <p>
            Within Means' platform allows you to connect with like-minded people
            and trade expertise for free! No money exchanged ever.
          </p>
          <LoginSvg />
        </GraphicsDiv>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const SignUpModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  /* align-items: center; */
  border-radius: 25px;
  margin: 60px;
  padding: 30px 50px;
  text-align: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const GraphicsDiv = styled.div`
  width: 100%;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Label = styled.label`
  text-align: left;
`;

const Input = styled.input`
  margin: 3px 0px 30px 0px;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid ${colors.navy};
  transition: 0.3s ease-in-out;
  &:focus {
    border: 1px solid ${colors.mediumPurple};
    background: white;
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    outline: none;
  }
`;

const SignUpBtn = styled.button`
  font-size: 18px;
  padding: 15px;
  background-color: ${colors.darkPurple};
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${colors.mediumPurple};
  }
`;

const Seperator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: gray;
  margin-top: 30px;
  margin-bottom: 30px;
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

const SignUp = styled.p`
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  color: ${colors.darkPurple};
  text-decoration: underline;
`;

export default Signup;
