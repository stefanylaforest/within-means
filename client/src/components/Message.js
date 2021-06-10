import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import { FaUserCircle, FaReply } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { colors } from "../GlobalStyles";
import moment from "moment";

const Message = ({
  message,
  date,
  senderId,
  senderAvatar,
  senderTitle,
  senderStatus,
  senderName,
  setAlert,
}) => {
  const { currentLoggedInUser, setCurrentLoggedInUser, updated, setUpdated } =
    useContext(LoggedInUserContext);
  const [clickReply, setClickReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);

  const toggleClickReply = () => {
    setClickReply(!clickReply);
  };

  const sendMessageHandler = () => {
    fetch(`/api/users/${senderId}/message`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inbox: {
          message: replyMessage,
          date: new Date(),
          senderId: currentLoggedInUser._id,
          senderName: currentLoggedInUser.name,
          senderAvatar: currentLoggedInUser.avatar,
          senderTitle: currentLoggedInUser.title,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        setClickReply(!clickReply);
        setAlert("message sent!");
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      })
      .catch((err) => {
        //history push to error page
      });
  };

  const deleteMessageHandler = () => {
    fetch(`/api/users/${currentLoggedInUser._id}/message/delete`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inbox: {
          message: message || "",
          date: date || null,
          senderId: senderId || null,
          senderName: senderName || "",
          senderAvatar: senderAvatar || null,
          senderTitle: senderTitle || "",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        setAlert("message deleted!");
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data.data));
        setUpdated(!updated);
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      })
      .catch((err) => {
        console.log("delete", err);
      });
  };

  return (
    <MessageWrapper>
      <RowWrapper>
        <AvatarAndName>
          {senderAvatar !== null ? (
            <Avatar src={senderAvatar} alt={`profile image`} />
          ) : (
            <StyledFaUserCircle />
          )}
          <p>From {senderName}</p> <SenderTitle>{senderTitle}</SenderTitle>
        </AvatarAndName>
        {!clickReply && (
          <IconWrap>
            <ReplyIcon onClick={toggleClickReply} />{" "}
            <DeleteIcon onClick={deleteMessageHandler} />
          </IconWrap>
        )}
      </RowWrapper>
      <MessageP>{message}</MessageP>
      <DateStamp>Sent on {moment(date).format("LLL")}</DateStamp>
      {!clickReply && (
        <IconWrapMobile>
          <ReplyIcon onClick={toggleClickReply} />{" "}
          <DeleteIcon onClick={deleteMessageHandler} />
        </IconWrapMobile>
      )}
      {clickReply && (
        <ReplyDiv>
          {" "}
          <Textarea
            placeholder={`type your message to ${senderName}`}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <SendMsgBtnDiv>
            <Cancel onClick={toggleClickReply}>Cancel</Cancel>
            <SendBtn onClick={sendMessageHandler}>Send</SendBtn>
          </SendMsgBtnDiv>
        </ReplyDiv>
      )}
    </MessageWrapper>
  );
};

const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 28px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const IconWrapMobile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 28px;
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

const ReplyIcon = styled(FaReply)`
  display: none;
  margin-right: 30px;
  font-size: 30px;
  fill: ${colors.navy};
  padding: 10px;
  cursor: pointer;
  &:hover {
    fill: #53bb8f;
  }
  @media screen and (max-width: 720px) {
    display: block;
  }
`;

const DeleteIcon = styled(TiDelete)`
  font-size: 40px;
  fill: ${colors.navy};
  cursor: pointer;
  display: none;
  &:hover {
    fill: ${colors.coral};
  }
  @media screen and (max-width: 720px) {
    display: block;
  }
`;

const MessageWrapper = styled.div`
  border-radius: 20px;
  padding: 10px;
  background: rgb(224, 224, 224, 0.3);
  margin: 15px 0px;
  border: 1px solid rgb(224, 224, 224, 0.1);
  transition: 0.2s ease-in-out;
  &:hover {
    background: rgb(224, 224, 224, 0.3);
    border: 1px solid ${colors.mediumPurple};
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);

    ${ReplyIcon}, ${DeleteIcon} {
      display: block;
    }
  }
`;

const AvatarAndName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 28px;
  /* font-size: 20px; */
`;

const SenderTitle = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.darkPurple};
  margin-left: 10px;
`;

// const NameAndTitle = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
`;

const StyledFaUserCircle = styled(FaUserCircle)`
  margin-right: 10px;
  font-size: 40px;
  fill: gray;
`;

const Avatar = styled.img`
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageP = styled.p`
  font-weight: 500;
  margin-left: 30px;
  margin-right: 30px;
`;

const DateStamp = styled.p`
  margin-left: 30px;
  margin-right: 30px;
`;

const ReplyDiv = styled.div`
  margin-left: 30px;
  margin-right: 30px;
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
  height: 100px;
  width: 95%;
  margin-right: 30px;
  background: white;
  transition: 0.3s ease-in-out;
  &:focus,
  &:hover {
    outline: none;
  }
`;

const SendMsgBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SendBtn = styled.button`
  margin: 10px;
  background-color: #53bb8f;
  color: white;
  border: none;
  border-radius: 26px;
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
  border-radius: 26px;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  width: 100px;
  &:hover {
    background-color: #ee7257;
  }
`;

export default Message;
