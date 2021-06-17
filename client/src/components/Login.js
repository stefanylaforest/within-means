import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled, { keyframes } from "styled-components";
import JumpSvg from "../assets/JumpSvg";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import { useHistory } from "react-router-dom";
import { colors } from "../GlobalStyles";
import Loading from "./Loaders/Loading";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  const {
    setCurrentLoggedInUser,
    setLoggedIn,
    errMsg,
    setErrMsg,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(LoggedInUserContext);
  let history = useHistory();

  const handleLoginFailure = (response) => {
    return;
  };

  const handleLoginSuccess = async (response) => {
    fetch("https://secure-journey-19068.herokuapp.com/api/googlelogin", {
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
        localStorage.setItem("currentLoggedInUser", JSON.stringify(json.data));
        history.push(`/`);
        if (errMsg !== "") {
          setErrMsg("");
        }
      });
  };

  const regularLogInHandler = async (e) => {
    e.preventDefault();
    const currentLoggedInUser = { email, password };
    if (email.length === 0 && password.length === 0) {
      setErrMsg("Please enter your log in information");
      return;
    } else if (!email.includes("@")) {
      setErrMsg("Please enter a valid email address");
      return;
    } else if (email.length === 0) {
      setErrMsg("Please enter your email");
      return;
    } else if (password.length === 0) {
      setErrMsg("Please enter your password");
      return;
    }

    fetch("https://secure-journey-19068.herokuapp.com/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setLoadingComponent(true);
          setCurrentLoggedInUser(json.data);
          setLoggedIn(true);
          localStorage.setItem(
            "currentLoggedInUser",
            JSON.stringify(json.data)
          );
          history.push(`/`);
          if (errMsg !== "") {
            setErrMsg("");
          }
          return;
        } else if (json.status === 404) {
          setErrMsg("No account found");
          return;
        } else if (json.status === 401) {
          setErrMsg("Incorrect email or password");
          return;
        } else {
          setErrMsg("Internal server error");
          return;
        }
      });
  };

  if (loadingComponent) {
    return <Loading />;
  } else {
    return (
      <Container>
        <LogInModal>
          <h2>Log In</h2>
          {errMsg !== "" && errMsg !== "No account found" ? (
            <ErrorMessage>{errMsg}</ErrorMessage>
          ) : errMsg !== "" && errMsg === "No account found" ? (
            <ErrorMessage>
              No account found with this email. Please sign up
            </ErrorMessage>
          ) : (
            ""
          )}
          <Label htmlFor="password">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMsg("");
            }}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Your Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrMsg("");
            }}
          />
          <LoginBtn type="submit" onClick={regularLogInHandler}>
            Log In
          </LoginBtn>
          <Seperator> or </Seperator>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <GoogleBtn onClick={renderProps.onClick} disabled={false}>
                <FcGoogle style={{ marginRight: 15 }} /> Continue with Google
              </GoogleBtn>
            )}
            // buttonText="Continue with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
          <SignUp>
            Not a member yet?{" "}
            <StyledLink exact to="/register">
              <span
                onClick={() => {
                  setErrMsg("");
                }}
              >
                Sign up
              </span>
            </StyledLink>
          </SignUp>
        </LogInModal>
        <GraphicsDiv>
          <h1>
            Connect with real professionals and make your entrepreneurial
            journey less lonely
          </h1>
          <p>
            Within Means' platform allows you to connect with like-minded people
            and trade expertise for free! No money exchanged ever.
          </p>
          <JumpSvg />
        </GraphicsDiv>
      </Container>
    );
  }
};

const fadeIn = keyframes`
   0% {
    opacity: 0;

   }
 
    100% {
    opacity: 1;

    }`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in;
`;

const LogInModal = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  border-radius: 25px;
  margin: 60px;
  padding: 30px 50px;
  text-align: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  @media screen and (min-width: 320px) and (max-width: 525px) {
    margin: 15px;
    padding: 20px 30px;
  }
`;

const GraphicsDiv = styled.div`
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid ${colors.navy};
  transition: 0.3s ease-in-out;
  &:focus,
  &:hover {
    border: 1px solid ${colors.mediumPurple};
    background: white;
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    outline: none;
  }
`;

const LoginBtn = styled.button`
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

const GoogleBtn = styled.button`
  font-size: 18px;
  padding: 15px;
  font-weight: 600;
  border: 2px solid #f0f0f0;
  background-color: white;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  &:hover {
    background-color: white;
  }
`;

const SignUp = styled.p`
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  color: ${colors.darkPurple};
  text-decoration: underline;
`;

export default Login;
