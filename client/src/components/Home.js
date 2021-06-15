import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import UserCard from "./UserCard";
import styled, { keyframes } from "styled-components";
import RecentPostLoading from "./Loaders/RecentPostLoading";
import { UsersContext } from "./UsersContext";
import About from "./About";
import Categories from "./Categories";
import { LoggedInUserContext } from "./LoggedInUserContext";

const Home = () => {
  const { users, userStatus } = useContext(UsersContext);
  const { currentLoggedInUser } = useContext(LoggedInUserContext);

  // const sortUsersByMostRecentStatus = users.sort((a, b) => {
  //   let dateTwo = Date.parse(a.statusDate);
  //   let dateOne = Date.parse(b.statusDate);
  //   return dateOne - dateTwo;
  // });

  return (
    <Wrapper>
      <Search users={users} />
      <HeaderRecentPost>Recent Postings</HeaderRecentPost>
      {userStatus === "idle" ? (
        <RecentPostingUl>
          {users &&
            users.slice(0, 3).map((user, i) => {
              console.log("from map", user);
              return (
                <RecentPostLi key={`user-${user._id}`}>
                  <UserCard user={user} />
                </RecentPostLi>
              );
            })}
        </RecentPostingUl>
      ) : (
        <RecentPostingUl>
          <RecentPostLoading />
          <RecentPostLoading />
          <RecentPostLoading />
        </RecentPostingUl>
      )}
      <Categories />
      {!currentLoggedInUser && <About />}
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
  animation: ${fadeIn} 0.3s ease-in;
`;

const HeaderRecentPost = styled.h3`
  margin-top: 50px;
  text-align: center;
`;

const RecentPostingUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  @media screen and (max-width: 920px) {
    flex-wrap: wrap;
  }
`;

const RecentPostLi = styled.li`
  margin: 30px;
`;

export default Home;
