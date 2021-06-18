import React, { useContext } from "react";
import styled from "styled-components";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { ImSearch } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { colors } from "../../GlobalStyles";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";

const MobileMenu = () => {
  const { currentLoggedInUser, loggedIn } = useContext(LoggedInUserContext);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      transition: "all 0.5s ease 0s",
    });
  };

  return (
    <Wrapper>
      <NavLink
        exact
        to={`/`}
        onClick={handleScrollToTop}
        activeStyle={{ color: `${colors.darkPurple}` }}
      >
        <BtnWrapper>
          <IconDiv>
            <StyledImSearch />
          </IconDiv>
          <Label>Search</Label>
        </BtnWrapper>
      </NavLink>

      <NavLink
        exact
        to={`/users/${currentLoggedInUser._id}/saved`}
        onClick={handleScrollToTop}
      >
        <BtnWrapper>
          <IconDiv>
            <StyledHiOutlineHeart />
          </IconDiv>
          <Label>Saved</Label>
        </BtnWrapper>
      </NavLink>

      <NavLink
        exact
        to={`/users/${currentLoggedInUser._id}/offers`}
        onClick={handleScrollToTop}
      >
        <BtnWrapper>
          <IconDiv>
            <StyledBsFillEnvelopeFill />
          </IconDiv>
          <Label>Offers</Label>
        </BtnWrapper>
      </NavLink>

      <NavLink
        exact
        to={loggedIn ? `/users/${currentLoggedInUser._id}/edit` : "/login"}
        onClick={handleScrollToTop}
      >
        <BtnWrapper>
          <IconDiv>
            <StyledProfile />
          </IconDiv>
          {loggedIn ? <Label>Profile</Label> : <Label>Log In</Label>}
        </BtnWrapper>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media screen and (min-width: 525px) {
    display: none;
  }
  @media screen and (max-width: 525px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    z-index: 100 !important;
    left: 0px !important;
    bottom: 0px !important;
    right: 0px !important;
    background-color: white;
    height: 65px;
    border-top: 1px solid rgb(221, 221, 221);
    align-items: center !important;
    -webkit-box-align: center !important;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 10px;
  line-height: 12px;
  max-height: 24px;
  color: gray;
`;

const StyledProfile = styled(CgProfile)`
  color: ${colors.navy};
  font-size: 24px;
  margin: 2px;
  &:active {
    color: ${colors.darkPurple};
  }
  &:hover {
    color: ${colors.darkPurple};
  }
`;

const StyledHiOutlineHeart = styled(HiOutlineHeart)`
  color: ${colors.navy};
  fill: ${colors.navy};
  font-size: 24px;
  margin: 2px;
  &:active {
    color: ${colors.darkPurple};
    fill: ${colors.darkPurple};
  }
  &:hover {
    color: ${colors.darkPurple};
    fill: ${colors.darkPurple};
  }
`;

const StyledBsFillEnvelopeFill = styled(BsFillEnvelopeFill)`
  color: ${colors.navy};
  font-size: 22px;
  margin: 2px;
  &:active {
    color: ${colors.darkPurple};
  }
  &:hover {
    color: ${colors.darkPurple};
  }
`;

const StyledImSearch = styled(ImSearch)`
  color: ${colors.navy};
  font-size: 22px;
  margin: 2px;
  &:active {
    color: ${colors.darkPurple};
  }
  &:hover {
    color: ${colors.darkPurple};
  }
`;

export default MobileMenu;
