import React, { useEffect, useContext } from "react";
import { UsersContext } from "../Context/UsersContext";
import UserCard from "./UserCard";
import styled, { keyframes } from "styled-components";
import { SearchContext } from "../Context/SearchContext";
import { useParams } from "react-router-dom";
import NoResultsFound from "./NoResultsFound";

const SearchResults = () => {
  const { users } = useContext(UsersContext);
  const {
    query,
    setQuery,
    matchedUsers,
    setMatchedUsers,
    queryStatus,
    setQueryStatus,
  } = useContext(SearchContext);

  let { searchQuery } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      transition: "all 0.5s ease 0s",
    });
    setQuery(searchQuery);
    const matches = users.map((user) => {
      let matchSkill = false;
      //filtering out the ones that didn't complete their profiles
      if (user.skills.length > 0) {
        user.skills.forEach((userSkill) => {
          if (userSkill?.toLowerCase().includes(query.toLowerCase())) {
            matchSkill = true;
          } else {
            matchSkill = false;
          }
        });
        if (
          matchSkill === true ||
          user.bio?.toLowerCase().includes(query.toLowerCase())
        ) {
          return user;
        }
      }
    });
    console.log(matches);
    const matchedFilter = matches.filter((match) => match !== undefined);

    setMatchedUsers(matchedFilter);
    setQueryStatus("idle");

    if (query !== searchQuery) {
      setQuery(query);
    }
  }, [query]);

  if (matchedUsers.length === 0 && queryStatus === "idle") {
    return <NoResultsFound />;
  } else {
    return (
      <Wrapper>
        <p>Search results for "{query}"</p>
        <SearchResultsUl>
          {matchedUsers.map((user) => {
            return (
              <Li key={`user-${user._id}`}>
                <UserCard user={user} />
              </Li>
            );
          })}
        </SearchResultsUl>
      </Wrapper>
    );
  }
};
const fadeIn = keyframes`
   0% {
    opacity: 0;

   }
 
    100% {
    opacity: 1;

    }`;

const Wrapper = styled.div`
  margin: 60px;
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
  animation: ${fadeIn} 0.3s ease-in;
`;
export default SearchResults;
