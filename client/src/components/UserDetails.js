import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import { useParams, useHistory } from "react-router-dom";
import { colors } from "../GlobalStyles";
import Loading from "./Loaders/Loading";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { ImArrowLeft2 } from "react-icons/im";
import moment from "moment";

const UserDetails = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [currentUserStatus, setCurrentUserStatus] = useState(true);
  const [alert, setAlert] = useState(null);
  const [toggleMsgInput, setToggleMsgInput] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentLoggedInUser, setCurrentLoggedInUser } =
    useContext(LoggedInUserContext);

  const history = useHistory();
  let { userId } = useParams();

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((rest) => rest.json())
      .then((json) => {
        setCurrentUser(json.data);
        setCurrentUserStatus(false);
        setUserSkills(json.data.skills);
      })
      .catch((err) => {
        console.log(err);
        //send to error page
      });
  }, [currentUser.status, userId]);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentLoggedInUser) {
      return history.push(`/login`);
    }
    fetch(`/api/users/${currentLoggedInUser._id}/save`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saved: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentLoggedInUser(data.data);
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data.data));
      });
  };

  const handleRemoveSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`/api/users/${currentLoggedInUser._id}/save/remove`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saved: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentLoggedInUser(data.data);
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data.data));
      });
  };

  const goBackHandler = () => {
    history.goBack();
  };

  const handleSendMessageInput = () => {
    setToggleMsgInput(!toggleMsgInput);
  };

  const sendMessageHandler = () => {
    fetch(`/api/users/${userId}/message`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inbox: {
          message: message,
          date: new Date(),
          senderId: currentLoggedInUser._id,
          senderName: currentLoggedInUser.name,
          senderAvatar: currentLoggedInUser.avatar,
          senderTitle: currentLoggedInUser.title,
          senderStatus: currentLoggedInUser.status,
          senderInbox: currentLoggedInUser.inbox,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToggleMsgInput(!toggleMsgInput);
        setAlert("message sent!");
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      })
      .catch((err) => {
        //history push to error page
      });
  };

  if (currentUserStatus) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <GoBack onClick={goBackHandler}>
        <GoBackIcon />
        Go back
      </GoBack>

      <Wrapper>
        <SaveBtn>
          <object>
            {currentLoggedInUser &&
            currentLoggedInUser.saved !== null &&
            currentLoggedInUser.saved.includes(userId) ? (
              <FilledHeart onClick={handleRemoveSave} />
            ) : (
              <EmptyHeart onClick={handleSave} />
            )}
          </object>
        </SaveBtn>
        <UserSpecs>
          <Avatar src={currentUser.avatar} />
          <Column>
            <Status>{currentUser.status}</Status>
            <Row>
              <div>
                <LastUpdated>
                  Last updated {moment(currentUser.statusDate).format("LLL")}
                </LastUpdated>
                <NameTitleWeb>👋 I'm {currentUser.name}</NameTitleWeb>
                <NameTitleWeb>💻 I am a {currentUser.title}</NameTitleWeb>
                <NameTitleWeb>🔗 {currentUser.website}</NameTitleWeb>
              </div>
              <div>
                <SkillsTitle>Skills I Can Offer:</SkillsTitle>
                <ul>
                  {userSkills &&
                    userSkills.map((skill, i) => {
                      return <li key={`id-${(skill, i)}`}>{skill}</li>;
                    })}
                </ul>
              </div>
            </Row>
          </Column>
        </UserSpecs>
        <Bio>Bio</Bio>
        <p>{currentUser.bio}</p>
        {toggleMsgInput ? (
          <>
            <Textarea
              placeholder={`type your message to ${currentUser.name}`}
              onChange={(e) => setMessage(e.target.value)}
            ></Textarea>
            <SendMsgBtnDiv>
              <Cancel onClick={handleSendMessageInput}>cancel</Cancel>
              <SendMsgBtn onClick={sendMessageHandler}>Send</SendMsgBtn>
            </SendMsgBtnDiv>
          </>
        ) : (
          <>
            <SendOfferBtn onClick={handleSendMessageInput}>
              Send an offer to {currentUser.name}
            </SendOfferBtn>
            {alert !== null && <Alert>{alert}</Alert>}
          </>
        )}
      </Wrapper>
    </div>
  );
};

const GoBack = styled.p`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  color: ${colors.darkPurple};
  width: 200px;
  cursor: pointer;
  margin: 60px;
`;

const GoBackIcon = styled(ImArrowLeft2)`
  font-size: 1.2em;
  color: ${colors.darkPurple};
  margin-right: 15px;
`;

const fadeIn = keyframes`
   0% {
    opacity: 0;

   }
 
    100% {
    opacity: 1;

    }`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  padding: 50px 70px 70px 70px;
  margin: 0 auto;
  background-color: white;
  border-radius: 25px;
  animation: ${fadeIn} 0.3s ease-in;
  margin-bottom: 100px;
`;

const EmptyHeart = styled(HiOutlineHeart)`
  color: ${colors.coral};
  &:hover {
    fill: ${colors.coral};
  }
  &:active {
    transform: scale(1.5);
    fill: ${colors.coral};
  }
  &:active:after {
    transform: scale(1.5);
    fill: ${colors.coral};
  }
`;

const FilledHeart = styled(HiHeart)`
  color: ${colors.coral};

  &:active {
    transform: scale(1.5);
  }
`;

const UserSpecs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LastUpdated = styled.p`
  color: gray;
  font-size: 0.8em;
  margin-bottom: -10px;
`;

const NameTitleWeb = styled.p`
  margin-bottom: -10px;
`;

const SkillsTitle = styled.h3`
  color: ${colors.darkPurple};
`;

const Bio = styled.h3`
  margin-bottom: -10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 600px;
  margin: 0px 100px 0px 30px;
`;

const SaveBtn = styled.div`
  cursor: pointer;
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
`;

const Avatar = styled.img`
  width: 230px;
  border-radius: 50%;
`;

const Status = styled.h1`
  font-size: 1.5em;
  margin: 0px 30px;
  color: ${colors.darkPurple};
`;

const SendOfferBtn = styled.button`
  background-color: ${colors.darkPurple};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${colors.mediumPurple};
  }
`;

const Textarea = styled.textarea`
  background: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
  margin-top: 3px;
  font-size: 16px;
  padding: 10px 16px;
  transition: 0.3s ease-in-out;
  height: 120px;
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

const SendMsgBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SendMsgBtn = styled.button`
  margin: 10px;
  background-color: #53bb8f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  width: 100px;
  &:hover {
    background-color: #5b9e82;
  }
`;

const Cancel = styled.button`
  margin: 10px;
  background-color: ${colors.coral};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  width: 100px;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #ee7257;
  }
`;

const Alert = styled.p`
  color: #53bb8f;
`;

export default UserDetails;
