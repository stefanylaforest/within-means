import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Search from "./Search";
import UserCard from "./UserCard";
import styled from "styled-components";
import RecentPostLoading from "../assets/RecentPostLoading";
import { UsersContext } from "./UsersContext";

const Home = () => {
  const { users, status } = useContext(UsersContext);

  const sortUsersByMostRecentStatus = users.sort((a, b) => {
    let dateTwo = Date.parse(a.statusDate);
    let dateOne = Date.parse(b.statusDate);
    return dateOne - dateTwo;
  });

  return (
    <div>
      <Header />
      <Search users={users} />
      <HeaderRecentPost>Recent Postings</HeaderRecentPost>
      {status === "idle" ? (
        <RecentPostingUl>
          {users &&
            sortUsersByMostRecentStatus.slice(0, 3).map((user) => {
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
    </div>
  );
};

const HeaderRecentPost = styled.p`
  margin-top: 40px;
  text-align: center;
`;

const RecentPostingUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const RecentPostLi = styled.li`
  margin: 30px;
`;

export default Home;
