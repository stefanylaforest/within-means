import React, { useContext, useState } from "react";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import styled, { keyframes } from "styled-components";
import Message from "./Message";

const Offers = () => {
  const { currentLoggedInUser } = useContext(LoggedInUserContext);
  const [alert, setAlert] = useState(null);

  return (
    <div>
      <Wrapper>
        <Header>
          <h1>Current Offers</h1>{" "}
          {alert !== null && <SuccessAlert>{alert}</SuccessAlert>}
        </Header>
        <Divider />
        {!currentLoggedInUser.inbox || currentLoggedInUser.inbox.length < 1 ? (
          <Empty>your inbox is empty 😞</Empty>
        ) : (
          currentLoggedInUser.inbox?.reverse().map((e) => {
            return (
              <Message
                key={e.date}
                message={e.message}
                date={e.date}
                senderId={e.senderId}
                senderName={e.senderName}
                senderAvatar={e.senderAvatar}
                senderTitle={e.senderTitle}
                senderStatus={e.senderStatus}
                alert={alert}
                setAlert={setAlert}
                element={e.date}
              />
            );
          })
        )}
      </Wrapper>
    </div>
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
  background: white;
  padding: 30px;
  margin: 60px;
  border-radius: 25px;
  animation: ${fadeIn} 0.3s ease-in;
  min-height: 70vh;
  @media screen and (max-width: 720px) {
    margin: 50px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const Empty = styled.p`
  text-align: left;
`;

const Divider = styled.hr`
  border: 1px solid #f0f0f0;
  width: 100%;
  margin-bottom: 30px;
  margin-top: -10px;
`;

const SuccessAlert = styled.p`
  color: #53bb8f;
  margin-left: 50px;
`;

export default Offers;
