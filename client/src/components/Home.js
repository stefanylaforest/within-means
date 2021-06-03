import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import RecentPostings from "./RecentPostings";
import styled from "styled-components";
import RecentPostLoading from "../assets/RecentPostLoading";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        // console.log("success", data);
        setUsers(json.data);
        setStatus("idle");
      });
  }, []);

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
                  <RecentPostings user={user} />
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
