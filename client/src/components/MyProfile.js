import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import EditProfile from "./EditProfile";
import styled, { keyframes } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { colors } from "../GlobalStyles";
import Loading from "./Loaders/Loading";

const MyProfile = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser, fetching } =
    useContext(LoggedInUserContext);
  const [newStatus, setNewStatus] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const updateStatusHandler = () => {
    fetch(`/api/users/${currentLoggedInUser._id}/update-status`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        statusDate: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("success", json);
        setCurrentLoggedInUser(json.data);
        setSuccessMsg("Status Updated Successfully");
        localStorage.setItem("currentLoggedInUser", JSON.stringify(json.data));
        window.scrollTo(0, 0);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 8000);
      });
  };

  // if (fetching) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
  // }
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
            <h2>{currentLoggedInUser.name}</h2>
            <ProfileId>profile id: {currentLoggedInUser._id}</ProfileId>
          </div>
        </AvatarAndName>
        <StatusSection>
          <h2>
            <label htmlFor="status">Update your status</label>
          </h2>
          <StatusTextArea
            defaultValue={currentLoggedInUser.status}
            onChange={(ev) => setNewStatus(ev.target.value)}
          />
          <UpdateStatusBtn onClick={updateStatusHandler}>
            Update Status
          </UpdateStatusBtn>

          {/* {currentLoggedInUser.status && (
            <p>Status last updated on {currentLoggedInUser.status}</p>
          )} */}
          <Notif>{successMsg}</Notif>
        </StatusSection>
      </Sidebar>
      <HalfContainer>
        <EditProfile />
      </HalfContainer>
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
  @media screen and (max-width: 950px) {
    margin: 10px 50px;
  }
`;

const ProfileId = styled.p`
  color: gray;
  font-size: 0.8em;
  margin-top: -15px;
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

export default MyProfile;
