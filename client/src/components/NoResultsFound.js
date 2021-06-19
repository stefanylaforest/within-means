import React, { useContext, useEffect } from "react";
import { UsersContext } from "../Context/UsersContext";
import { SearchContext } from "../Context/SearchContext";
import UserCard from "./UserCard";
import styled, { keyframes } from "styled-components";
import Loading from "./Loaders/Loading";
import NoResultsSvg from "../assets/NoResultsFoundSvg";
import { useParams } from "react-router-dom";
import { colors } from "../GlobalStyles";

const NoResultsFound = () => {
  const { users, userStatus } = useContext(UsersContext);
  const { query, setQuery } = useContext(SearchContext);
  let { searchQuery } = useParams();

  useEffect(() => {
    setQuery(searchQuery);
  });

  return (
    <div>
      <Content>
        <LeftColumn>
          <h2>
            <Oops>Oops...</Oops> No Matching Results Found For "{query}"
          </h2>
          <p>Try a new search or view recommended below</p>
        </LeftColumn>
        <RightColumn>
          <NoResultsSvg />
        </RightColumn>
      </Content>
      {userStatus === "loading" && (
        <CenteredContent>
          <Loading />
        </CenteredContent>
      )}
      <CenteredContent>
        {" "}
        <h2>Recommended</h2>
      </CenteredContent>

      <SearchResultsUl>
        {users
          .filter((userStatus) => userStatus.status !== null)
          .map((user) => {
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

const Oops = styled.h2`
  font-size: 3em;
  color: ${colors.darkPurple};
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin: 60px;
`;

const RightColumn = styled.div`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin: 60px;
`;

const SearchResultsUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px 60px 60px 60px;
  flex-wrap: wrap;
  @media screen and (max-width: 550px) {
    margin: 40px 10px 10px 10px;
  }
`;

const fadeIn = keyframes`
   0% {
    opacity: 0;

   }
 
    100% {
    opacity: 1;

    }`;

const Li = styled.li`
  margin: 20px;
  animation: ${fadeIn} 0.3s ease-in;
`;
export default NoResultsFound;
