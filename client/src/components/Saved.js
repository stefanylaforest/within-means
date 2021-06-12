import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { UsersContext } from "./UsersContext";
import { LoggedInUserContext } from "./LoggedInUserContext";
import UserCard from "./UserCard";

const Saved = () => {
  const { users } = useContext(UsersContext);
  const { currentLoggedInUser, setCurrentLoggedInUser } =
    useContext(LoggedInUserContext);
  const [savedUsers, setSavedUsers] = useState(null);
  //for fadeout effect
  const [removeSaved, setRemoveSaved] = useState("");

  useEffect(() => {
    if (currentLoggedInUser.saved) {
      let filteredUsers = users.filter((user) =>
        currentLoggedInUser.saved.includes(user._id)
      );
      setSavedUsers(filteredUsers);
    }
  }, [currentLoggedInUser.saved]);

  console.log("savedUsers", savedUsers);

  return (
    <Wrapper>
      <h1>Users Saved</h1>
      <Divider />
      {!currentLoggedInUser.saved ||
        (currentLoggedInUser.saved.length < 1 && <div>No Saved Users</div>)}
      <SearchResultsUl>
        {savedUsers?.map((user) => (
          <Li
            key={`user-${user._id}`}
            style={{ opacity: removeSaved === user._id ? 0 : 1 }}
          >
            <UserCard user={user} setRemoveSaved={setRemoveSaved} />
          </Li>
        ))}
      </SearchResultsUl>
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
  background: white;
  padding: 30px;
  margin: 60px;
  border-radius: 25px;
  animation: ${fadeIn} 0.3s ease-in;
  @media screen and (max-width: 720px) {
    margin: 50px;
  }
`;

const Divider = styled.hr`
  border: 1px solid #f0f0f0;
  width: 100%;
  margin-bottom: 30px;
  margin-top: -10px;
`;

const SearchResultsUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const Li = styled.li`
  margin: 20px;
`;

export default Saved;
