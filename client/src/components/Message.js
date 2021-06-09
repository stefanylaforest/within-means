import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const Message = ({
  message,
  date,
  senderId,
  senderAvatar,
  senderTitle,
  senderStatus,
  senderName,
}) => {
  return (
    <MessageWrapper>
      {senderAvatar !== null ? (
        <img src={senderAvatar} alt={`profile image`} />
      ) : (
        <FaUserCircle />
      )}
      <p>{senderName}</p>
      <p>{message}</p>
      <p>{date}</p>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  &:hover {
    background: rgb(224, 224, 224, 0.3);
  }
`;

export default Message;
