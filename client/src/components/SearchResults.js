import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";
import UserCard from "./UserCard";
import styled from "styled-components";
import { SearchContext } from "./SearchContext";
import { useParams } from "react-router-dom";
import Loading from "./Loaders/Loading";
import NoResultsFound from "./NoResultsFound";

const SearchResults = () => {
  const { users } = useContext(UsersContext);
  const {
    query,
    setQuery,
    matchedUsers,
    setMatchedUsers,
    matchedCount,
    setMatchedCount,
    queryStatus,
    setQueryStatus,
  } = useContext(SearchContext);

  let { searchQuery } = useParams();
  console.log("query", query);

  useEffect(() => {
    setQuery(searchQuery);
    const matches = users.map((user) => {
      let matchSkill = false;
      //filtering out the ones that didn't complete their profiles
      if (user.skills !== null) {
        user.skills.forEach((userSkill) => {
          if (userSkill.toLowerCase().includes(query.toLowerCase())) {
            matchSkill = true;
          } else {
            matchSkill = false;
          }
        });
        if (
          matchSkill === true ||
          user.bio !== null ||
          user.bio.toLowerCase().includes(query.toLowerCase())
        ) {
          return user;
        }
      }
    });
    const matchedFilter = matches.filter((match) => match !== undefined);
    setMatchedUsers(matchedFilter);
    setQueryStatus("idle");

    if (query !== searchQuery) {
      setQuery(query);
    }
  }, [query]);

  // console.log(matchedUsers);
  if (matchedUsers.length === 0 && queryStatus === "idle") {
    return <NoResultsFound />;
  } else {
    return (
      <div>
        <p>Search results for "{query}"</p>
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
  }
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
export default SearchResults;
