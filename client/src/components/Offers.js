import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import Message from "./Message";
import { colors } from "../GlobalStyles";

const Offers = () => {
  const { currentLoggedInUser, fetching } = useContext(LoggedInUserContext);
  const [alert, setAlert] = useState(null);

  if (fetching) {
    return <p>loading..</p>;
  }
  return (
    <div>
      <Wrapper>
        <Header>
          <h1>Current Offers</h1>{" "}
          {alert !== null && <SuccessAlert>{alert}</SuccessAlert>}
        </Header>
        <Divider />
        {!currentLoggedInUser.inbox ? (
          <Empty>your inbox is empty 😞</Empty>
        ) : (
          currentLoggedInUser.inbox?.reverse().map((e) => {
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
                  alert={alert}
                  setAlert={setAlert}
                />
              </div>
            );
          })
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background: white;
  padding: 30px;
  margin: 60px;
  border-radius: 25px;
  @media screen and (max-width: 720px) {
    margin: 50px;
  }
`;

const Header = styled.p`
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
