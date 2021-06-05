import React, { useContext, useEffect } from "react";
import { UsersContext } from "./UsersContext";
import { SearchContext } from "./SearchContext";
import UserCard from "./UserCard";
import styled from "styled-components";
import Loading from "./Loaders/Loading";
import NoResultsSvg from "../assets/NoResultsFoundSvg";
import { useParams } from "react-router-dom";

const NoResultsFound = () => {
  const { users, userStatus } = useContext(UsersContext);
  const { query, setQuery } = useContext(SearchContext);
  let { searchQuery } = useParams();

  useEffect(() => {
    setQuery(searchQuery);
  });

  return (
    <div>
      <CenteredContent>
        <h2>Oops... No Matching Results Found For "{query}"</h2>
        <p>Try a new search or view recommended below</p>
        <NoResultsSvg />
        <h2>Recommended</h2>
      </CenteredContent>
      {userStatus === "loading" && (
        <CenteredContent>
          <Loading />
        </CenteredContent>
      )}
      <SearchResultsUl>
        {users.map((user) => {
          return (
            <Li>
              <UserCard key={user._id} user={user} />
            </Li>
          );
        })}
      </SearchResultsUl>
    </div>
  );
};

const CenteredContent = styled.div`
  text-align: center;
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
export default NoResultsFound;
