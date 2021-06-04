import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";
import UserCard from "./UserCard";
import styled from "styled-components";

const SearchResults = () => {
  const { matchedUsers, setMatchedUsers } = useContext(UsersContext);
  console.log(matchedUsers);

  return (
    <div>
      <p>Search results for </p>
      <SearchResultsUl>
        {matchedUsers.map((user) => {
          return (
            <Li>
              <UserCard user={user} />
            </Li>
          );
        })}
      </SearchResultsUl>
    </div>
  );
};

const SearchResultsUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const Li = styled.li`
  margin: 20px;
`;
export default SearchResults;
