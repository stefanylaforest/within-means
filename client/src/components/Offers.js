import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import Message from "./Message";

const Offers = () => {
  const { currentLoggedInUser } = useContext(LoggedInUserContext);

  return (
    <Wrapper>
      {!currentLoggedInUser.inbox && <p>your inbox is empty</p>}
      {currentLoggedInUser.inbox?.reverse().map((e) => {
        return (
          <div key={`${e.date}-${e.from}`}>
            <Message
              message={e.message}
              date={e.date}
              senderId={e.senderId}
              senderName={e.senderName}
              senderAvatar={e.senderAvatar}
              senderTitle={e.senderTitle}
              senderStatus={e.senderStatus}
            />
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  padding: 30px;
  margin: 100px;
  border-radius: 25px;
`;

export default Offers;
