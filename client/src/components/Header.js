import React, { useState, useContext } from "react";
import styled from "styled-components";
import WithinMeansLogo from "../assets/WithinMeansLogo";
import { colors } from "../GlobalStyles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ImSearch, ImArrowRight2 } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { SearchContext } from "./SearchContext";
import { LoggedInUserContext } from "./LoggedInUserContext";
import DropdownMenu from "../components/HeaderComponents/DropdownMenu";

const Header = () => {
  const [newQuery, setNewQuery] = useState("");
  const { query, setQuery } = useContext(SearchContext);
  const { currentLoggedInUser, loggedIn } = useContext(LoggedInUserContext);
  const location = useLocation();
  const history = useHistory();

  const headerQueryHandler = (e) => {
    e.preventDefault();
    setQuery(newQuery);
    if (location.pathname !== "/search/:searchQuery") {
      history.push(`/search/${newQuery}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return console.log("yo");
      // headerQueryHandler();
    }
  };

  return (
    <LogoWrapper>
      <Link to="/">
        <h1>
          <LogoSpan>
            <WithinMeansLogo /> <SiteName>Within Means</SiteName>
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
            onKeyDown={(e) => handleKeyPress(e)}
            onClick={(e) => {
              headerQueryHandler(e);
            }}
          >
            <ImArrowRight2 />
          </SearchBtn>
        </InputDiv>
      )}

      <LoggedInDisplay>
        <Greeting>Hi, {currentLoggedInUser.name}</Greeting>

        {currentLoggedInUser.avatar !== null ? (
          <div>
            <Wrapper>
              <Hover>
                <Profile src={currentLoggedInUser.avatar} />
                <DropdownBox>
                  <DropdownMenu />
                </DropdownBox>
              </Hover>
            </Wrapper>
          </div>
        ) : (
          <div>
            <Wrapper>
              <Hover>
                <StyledFaUserCircle />
                <DropdownBox>
                  <DropdownMenu />
                </DropdownBox>
              </Hover>
            </Wrapper>
          </div>
        )}
      </LoggedInDisplay>
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

const SiteName = styled.span`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Greeting = styled.p`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin: 0px;
  position: relative;
`;

const LoggedInDisplay = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-right: 60px; */
`;

const DropdownBox = styled.div`
  margin-top: -5px;
  margin-right: 100px;
  background-color: rgb(255, 255, 255, 100%);
  border-radius: 25px;
  width: 100%;
  position: absolute;
  left: -55px;
  display: none;
  z-index: 1;
  padding: 10px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Hover = styled.div`
  &:hover {
    ${DropdownBox} {
      display: block;
      /* @media screen and (max-width: 650px) {
        display: none;
      } */
    }
  }
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 0px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 1;
`;

const StyledFaUserCircle = styled(FaUserCircle)`
  font-size: 50px;
  fill: ${colors.mediumPurple};
  cursor: pointer;
  margin: 0px 20px;
  border-radius: 50%;
  z-index: 1;
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
  border: 1px solid white;
  transition: 0.3s ease-in-out;
  &:hover {
    border: 1px solid ${colors.mediumPurple};
    background: white;
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    outline: none;
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

export default Header;
