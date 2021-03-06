import React, { useContext, useState } from "react";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import EditProfile from "./EditProfile";
import styled, { keyframes } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { colors } from "../GlobalStyles";
import { Link, useHistory } from "react-router-dom";
import { MdPowerSettingsNew } from "react-icons/md";
import moment from "moment";

const MyProfile = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser, setLoggedIn } =
    useContext(LoggedInUserContext);
  const [newStatus, setNewStatus] = useState();
  const [successMsg, setSuccessMsg] = useState();

  let history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentLoggedInUser("");
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      transition: "all 0.5s ease 0s",
    });
  };

  const updateStatusHandler = () => {
    fetch(
      `https://secure-journey-19068.herokuapp.com/api/users/${currentLoggedInUser._id}/update-status`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          statusDate: new Date(),
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setCurrentLoggedInUser(json.data);
        setSuccessMsg("Status Updated Successfully");
        localStorage.setItem("currentLoggedInUser", JSON.stringify(json.data));
        window.scrollTo(0, 0);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 8000);
      });
  };

  return (
    <Wrapper>
      <Sidebar>
        <Link exact to={`/users/${currentLoggedInUser._id}`}>
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
              <h2>{currentLoggedInUser.name}</h2>
              <ProfileId>profile id: {currentLoggedInUser._id}</ProfileId>
              <View>View Your Public Profile </View>
            </div>
          </AvatarAndName>
        </Link>
        <StatusSection>
          <h2>
            <label htmlFor="status">Update your status</label>
          </h2>
          <Divider />
          <p>What does your business need?</p>
          <StatusTextArea
            defaultValue={currentLoggedInUser.status}
            onChange={(ev) => setNewStatus(ev.target.value)}
          />
          <UpdateStatusBtn onClick={updateStatusHandler}>
            Update Status
          </UpdateStatusBtn>

          {currentLoggedInUser.status && (
            <LastUpdated>
              Status last updated on{" "}
              {moment(currentLoggedInUser.statusDate).format("LLL")}
            </LastUpdated>
          )}
          <Notif>{successMsg}</Notif>
        </StatusSection>
      </Sidebar>
      <HalfContainer>
        <EditProfile />
      </HalfContainer>
      <LogOutDiv>
        <h3>End Session</h3>
        <Divider />
        <LogOutButton onClick={handleLogOut}>
          <StyledMdPowerSettingsNew />
          Log Out
        </LogOutButton>
      </LogOutDiv>
    </Wrapper>
  );
};

const fadeIn = keyframes`
   0% {
    opacity: 0;

   }
 
    100% {
    opacity: 1;

    }`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  animation: ${fadeIn} 0.3s ease-in;

  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
  }
`;

const HalfContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  width: 40%;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;

const AvatarAndName = styled.div`
  margin: 60px 0px 30px 60px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 950px) {
    margin: 10px 50px;
  }

  @media screen and (max-width: 525px) {
    margin: 10px;
  }
`;

const ProfileId = styled.p`
  color: gray;
  font-size: 0.8em;
  margin-top: -15px;
`;

const View = styled.div`
  margin-top: -10px;
  color: ${colors.darkPurple};
`;

const StatusSection = styled.div`
  margin: 10px 0px 60px 60px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 950px) {
    margin: 10px 50px;
  }
  @media screen and (max-width: 525px) {
    margin: 10px;
  }
`;

const LastUpdated = styled.p`
  color: gray;
  font-size: 0.8em;
  margin: 20px auto;
`;

const Divider = styled.hr`
  border: 1px solid #f0f0f0;
  width: 100%;
  margin-top: -10px;
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

const StatusTextArea = styled.textarea`
  background: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
  margin-top: 3px;
  font-size: 16px;
  padding: 10px 16px;
  transition: 0.3s ease-in-out;
  height: 100px;
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

const Notif = styled.p`
  color: #53bb8f;
`;

const UpdateStatusBtn = styled.button`
  font-size: 18px;
  padding: 15px;
  background-color: ${colors.darkPurple};
  color: white;
  cursor: pointer;
  border: none;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.mediumPurple};
  }
`;

const LogOutDiv = styled.div`
  display: none;
  @media screen and (max-width: 525px) {
    display: block;
    background-color: white;
    margin: 10px;
    border-radius: 20px;
    padding: 35px;
  }
`;

const LogOutButton = styled.button`
  @media screen and (max-width: 525px) {
    display: block;
    background-color: #f0f0f0;
    color: ${colors.navy};
    font-size: 18px;
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    margin: 30px auto;
    border: none;
  }
`;

const StyledMdPowerSettingsNew = styled(MdPowerSettingsNew)`
  margin: 0px 5px -2px 0px;
`;

export default MyProfile;
