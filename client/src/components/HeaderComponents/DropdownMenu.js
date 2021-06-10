import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { MdSettings, MdPowerSettingsNew } from "react-icons/md";
import { Link } from "react-router-dom";
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

  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentLoggedInUser("");
    localStorage.clear();
  };

  return (
    <div>
      <ul>
        <Link exact to={`/users/${currentLoggedInUser._id}/edit`}>
          <DropDownListItem>
            <StyledMdSettings /> Profile
          </DropDownListItem>
        </Link>
        <Link exact to={`/users/${currentLoggedInUser._id}/offers`}>
          <DropDownListItem>
            <StyledBsFillEnvelopeFill /> Offers
          </DropDownListItem>
        </Link>
        <Link exact to={`/users/${currentLoggedInUser._id}/saved`}>
          <DropDownListItem>
            <StyledHiOutlineHeart /> Saved
          </DropDownListItem>
        </Link>

        <Link exact to="/">
          <DropDownListItem onClick={handleLogOut}>
            <StyledMdPowerSettingsNew /> Log out
          </DropDownListItem>
        </Link>
      </ul>
    </div>
  );
};

const DropDownListItem = styled.li`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  background: transparent;
  width: 100%;
  padding: 8px;
  text-align: left;
  &:hover {
    color: ${colors.coral};
  }
`;

const StyledMdSettings = styled(MdSettings)`
  fill: ${colors.coral};
  color: ${colors.coral};
  margin-right: 5px;
`;

const StyledHiOutlineHeart = styled(HiOutlineHeart)`
  fill: ${colors.coral};
  color: ${colors.coral};
  margin-right: 5px;
`;

const StyledBsFillEnvelopeFill = styled(BsFillEnvelopeFill)`
  fill: ${colors.coral};
  color: ${colors.coral};
  margin-right: 5px;
`;

const StyledMdPowerSettingsNew = styled(MdPowerSettingsNew)`
  fill: ${colors.coral};
  color: ${colors.coral};
  margin-right: 5px;
`;

export default DropdownMenu;
