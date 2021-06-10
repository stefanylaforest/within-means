import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import EditProfile from "./EditProfile";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { colors } from "../GlobalStyles";

const MyProfile = () => {
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

  console.log("type of", currentLoggedInUser._id);
  return (
    <Wrapper>
      <Sidebar>
        <AvatarAndName>
          {currentLoggedInUser.avatar !== null && currentLoggedInUser ? (
            <div>
              <Profile src={currentLoggedInUser.avatar} />
            </div>
          ) : (
            <div>
              <StyledFaUserCircle />
            </div>
          )}
          <div>
            <h2>{currentLoggedInUser.name}'s profile</h2>
            <ProfileId>profile id: {currentLoggedInUser._id}</ProfileId>
          </div>
        </AvatarAndName>
        <Menu>
          <ul>
            <li>Account Settings</li>
            <li>Saved</li>
            <li>Offers</li>
          </ul>
        </Menu>
      </Sidebar>
      <HalfContainer>
        <EditProfile />
      </HalfContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const HalfContainer = styled.div`
  width: 60%;
`;

const Sidebar = styled.div`
  width: 40%;
`;

const AvatarAndName = styled.div`
  margin: 100px 0px 100px 100px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;

const ProfileId = styled.p`
  color: gray;
  font-size: 0.8em;
  margin-top: -15px;
`;

const Menu = styled.div`
  margin: 100px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin: 0px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 1;
`;

const StyledFaUserCircle = styled(FaUserCircle)`
  font-size: 80px;
  fill: ${colors.mediumPurple};
  cursor: pointer;
  margin: 0px 20px;
  border-radius: 50%;
  z-index: 1;
`;

export default MyProfile;
