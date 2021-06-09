import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UsersContext } from "./UsersContext";
import { LoggedInUserContext } from "./LoggedInUserContext";
import UserCard from "./UserCard";

const Saved = () => {
  const { users } = useContext(UsersContext);
  const { currentLoggedInUser, setCurrentLoggedInUser } =
    useContext(LoggedInUserContext);
  const [savedUsers, setSavedUsers] = useState(null);

  useEffect(() => {
    if (currentLoggedInUser.saved) {
      let filteredUsers = users.filter((user) =>
        currentLoggedInUser.saved.includes(user._id)
      );
      setSavedUsers(filteredUsers);
    }
  }, [currentLoggedInUser.saved]);

  console.log("savedUsers", savedUsers);

  if (!currentLoggedInUser.saved) {
    return <div>No Saved Users</div>;
  } else
    return (
      <div>
        <h2>Users Saved</h2>
        <SearchResultsUl>
          {savedUsers?.map((user) => (
            <Li>
              <UserCard user={user} />
            </Li>
          ))}
        </SearchResultsUl>
      </div>
    );
};

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
