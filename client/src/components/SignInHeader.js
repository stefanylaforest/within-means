import React, { useState, useContext } from "react";
import styled from "styled-components";
import WithinMeansLogo from "../assets/WithinMeansLogo";
import { colors } from "../GlobalStyles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ImSearch, ImArrowRight2 } from "react-icons/im";
import { SearchContext } from "../Context/SearchContext";

const SignInHeader = () => {
  const [newQuery, setNewQuery] = useState("");
  const { setQuery } = useContext(SearchContext);

  const location = useLocation();
  const history = useHistory();

  const headerQueryHandler = (e) => {
    e.preventDefault();
    setQuery(newQuery);
    if (location.pathname !== "/search/:searchQuery") {
      history.push(`/search/${newQuery}`);
    }
  };

  return (
    <Container>
      <Link to="/">
        <h1>
          <LogoSpan>
            <WithinMeansLogo /> <SiteName>Within Means</SiteName>
          </LogoSpan>
        </h1>
      </Link>
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <InputDiv>
            <StyledSearchIcon />
            <SearchBar
              type="text"
              placeholder="search services"
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <SearchBtn
              onClick={(e) => {
                headerQueryHandler(e);
              }}
            >
              <ImArrowRight2 />
            </SearchBtn>
          </InputDiv>
        )}

      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <div>
          <Link exact to="/login">
            <SignIn>Log In</SignIn>
          </Link>
          <Link exact to="/register">
            <SignUp>Start Swapping</SignUp>
          </Link>
        </div>
      )}

      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <InputDivMobile>
            <StyledSearchIcon />
            <SearchBar
              type="text"
              placeholder="search services"
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <SearchBtn
              onClick={(e) => {
                headerQueryHandler(e);
              }}
            >
              <ImArrowRight2 />
            </SearchBtn>
          </InputDivMobile>
        )}
      {location.pathname === "/login" && (
        <Link exact to="/register">
          <SignUp>Start Swapping</SignUp>
        </Link>
      )}

      {location.pathname === "/register" && (
        <Link exact to="/login">
          <SignIn>Log In</SignIn>
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  @media screen and (max-width: 525px) {
    flex-wrap: wrap;
  }
`;

const LogoSpan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;

const SiteName = styled.span`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const SignUp = styled.button`
  margin: 0px 20px;
  border-radius: 6px;
  padding: 15px 10px;
  border: none;
  cursor: pointer;
  background-color: ${colors.darkPurple};
  color: white;
  font-weight: bold;
  transition: 1s ease;
  background-size: 200% auto;
  &:hover {
    background-position: right center;
    background-image: linear-gradient(
      to right,
      #3641e7 0%,
      #7279de 51%,
      #3641e7 100%
    );
    color: white;
  }

  @media screen and (max-width: 782px) {
    padding: 15px 5px;
    margin: 0px;
  }
`;

const SignIn = styled.button`
  margin: 0px 10px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${colors.darkPurple};
  font-weight: bold;
  @media screen and (max-width: 525px) {
    display: none;
  }

  @media screen and (max-width: 772px) {
    margin: 0;
  }
`;

const InputDiv = styled.div`
  margin: 0 auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 40px;
  background: white;
  width: 400px;

  @media screen and (max-width: 525px) {
    display: none;
  }
`;

const InputDivMobile = styled.div`
  display: none;
  @media screen and (max-width: 525px) {
    display: block;
    width: 300px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    margin: 10px auto;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 40px;
    background: white;
  }
`;

const StyledSearchIcon = styled(ImSearch)`
  color: ${colors.darkPurple};
  font-size: 20px;
  margin: 0px 10px 0px 20px;
`;

const SearchBar = styled.input`
  margin: 0 auto;
  width: 90%;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  height: 100%;
  border: none;
  color: white;
  padding-right: 15px;
  font-size: inherit;
  cursor: pointer;
  background-color: transparent;
  color: ${colors.darkPurple};
  display: flex;
  align-items: center;
`;

export default SignInHeader;
