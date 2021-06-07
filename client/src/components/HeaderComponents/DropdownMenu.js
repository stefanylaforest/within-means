import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
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

  return (
    <div>
      <ul>
        <Link exact to={`/users/${currentLoggedInUser._id}/edit`}>
          <DropDownListItem>My Profile</DropDownListItem>
        </Link>
        <Link>
          <DropDownListItem>
            Offers <StyledBsFillEnvelopeFill />
          </DropDownListItem>
        </Link>
        <Link>
          <DropDownListItem>
            Saved <StyledHiOutlineHeart />
          </DropDownListItem>
        </Link>
      </ul>
    </div>
  );
};

const DropDownListItem = styled.li`
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  padding: 8px;
  text-align: left;
  &:hover {
    color: ${colors.coral};
  }
`;

const StyledHiOutlineHeart = styled(HiOutlineHeart)`
  fill: ${colors.coral};
  color: ${colors.coral};
`;

const StyledBsFillEnvelopeFill = styled(BsFillEnvelopeFill)`
  fill: ${colors.coral};
  color: ${colors.coral};
`;

export default DropdownMenu;
