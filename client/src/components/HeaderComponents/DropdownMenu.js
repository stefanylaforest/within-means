import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { MdSettings, MdPowerSettingsNew } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { colors } from "../../GlobalStyles";
import { LoggedInUserContext } from "../LoggedInUserContext";

const DropdownMenu = () => {
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

  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentLoggedInUser("");
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <ul>
        <Link exact to={`/users/${currentLoggedInUser._id}`}>
          <DropDownListItemProfile>
            <ViewPublicProfileDiv>
              <Avatar
                src={currentLoggedInUser.avatar}
                alt="your profile image"
              />
              <NameAndLabel>
                <p>{currentLoggedInUser.name}</p>
                <View>View Your Public Profile </View>
              </NameAndLabel>
            </ViewPublicProfileDiv>
          </DropDownListItemProfile>
        </Link>
        <Divider />
        <Link exact to={`/users/${currentLoggedInUser._id}/edit`}>
          <DropDownListItem>
            <MenuItemDiv>
              <StyledMdSettings />
              Edit Your Profile
            </MenuItemDiv>
          </DropDownListItem>
        </Link>
        <Link exact to={`/users/${currentLoggedInUser._id}/offers`}>
          <DropDownListItem>
            <MenuItemDiv>
              <StyledBsFillEnvelopeFill /> View Offers
            </MenuItemDiv>
          </DropDownListItem>
        </Link>
        <Link exact to={`/users/${currentLoggedInUser._id}/saved`}>
          <DropDownListItem>
            <MenuItemDiv>
              <StyledHiOutlineHeart /> Saved Listings
            </MenuItemDiv>
          </DropDownListItem>
        </Link>
        <Divider />
        <Link exact to="/">
          <DropDownListItem onClick={handleLogOut}>
            <MenuItemDiv>
              <StyledMdPowerSettingsNew /> Log out
            </MenuItemDiv>
          </DropDownListItem>
        </Link>
      </ul>
    </div>
  );
};

const DropDownListItemProfile = styled.li`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  height: 100px;
  border-radius: 20px;

  &:hover {
    color: ${colors.darkPurple};
    background-color: #f0f0f0;
  }
`;

const DropDownListItem = styled.li`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  height: 60px;
  border-radius: 20px;

  &:hover {
    color: ${colors.darkPurple};
    background-color: #f0f0f0;
  }
`;

const ViewPublicProfileDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  padding: 0px 10px;
  border-radius: 50%;
`;

const NameAndLabel = styled.div`
  flex-direction: column;
  margin-top: -7px;
`;

const View = styled.div`
  margin-top: -15px;
  color: ${colors.darkPurple};
`;

const Divider = styled.hr`
  border: 1px solid #f0f0f0;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MenuItemDiv = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const StyledMdSettings = styled(MdSettings)`
  fill: ${colors.darkPurple};
  color: ${colors.darkPurple};
  margin-right: 10px;
  font-size: 24px;
`;

const StyledHiOutlineHeart = styled(HiOutlineHeart)`
  fill: ${colors.darkPurple};
  color: ${colors.darkPurple};
  margin-right: 10px;
  font-size: 24px;
`;

const StyledBsFillEnvelopeFill = styled(BsFillEnvelopeFill)`
  fill: ${colors.darkPurple};
  color: ${colors.darkPurple};
  margin-right: 12px;
  font-size: 20px;
`;

const StyledMdPowerSettingsNew = styled(MdPowerSettingsNew)`
  fill: ${colors.darkPurple};
  color: ${colors.darkPurple};
  margin-right: 10px;
  font-size: 24px;
`;

export default DropdownMenu;
