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
    let matches = [];
    users.forEach((user) => {
      if (user.skills !== null && user.skills.length > 0) {
        user.skills.forEach((userSkill) => {
          if (
            userSkill !== null &&
            userSkill.toLowerCase().includes(query.toLowerCase())
          ) {
            matches.push(user);
          }
        });
      }
      if (
        user.bio?.toLowerCase().includes(query.toLowerCase()) &&
        !matches.includes(user)
      ) {
        matches.push(user);
      }
    });
    //removes duplicate objects
    let newMatches = [];
    let uniqueObject = {};
    let objTitle;
    for (let i in matches) {
      objTitle = matches[i]["_id"];
      uniqueObject[objTitle] = matches[i];
    }

    for (let i in uniqueObject) {
      newMatches.push(uniqueObject[i]);
    }
    setMatchedUsers(newMatches);
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
              <Li key={user._id}>
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
