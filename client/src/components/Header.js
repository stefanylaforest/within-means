import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import WithinMeansLogo from "../assets/WithinMeansLogo";
import { colors } from "../GlobalStyles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ImSearch, ImArrowRight2 } from "react-icons/im";
import { SearchContext } from "./SearchContext";

const Header = () => {
  const [newQuery, setNewQuery] = useState("");
  const { query, setQuery } = useContext(SearchContext);
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
    <LogoWrapper>
      <Link to="/">
        <h1>
          <LogoSpan>
            <WithinMeansLogo />{" "}
            {location.pathname === "/" || location.pathname === "/login" ? (
              <span>Within Means</span>
            ) : (
              ""
            )}
          </LogoSpan>
        </h1>
      </Link>
      {location.pathname !== "/" && location.pathname !== "/login" && (
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
      {location.pathname !== "/login" && <SignUp>Start Swapping</SignUp>}
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const LogoSpan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
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

export default Header;
