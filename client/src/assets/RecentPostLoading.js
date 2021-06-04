import React from "react";
import styled from "styled-components";
import { colors } from "../GlobalStyles";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const UserCard = ({ user }) => {
  console.log("UserCard", user);
  return (
    <Wrapper>
      <LikeContainer>
        <Heart />
      </LikeContainer>
      <Avatar />
      <Status>I need help with my social media</Status>
      <OfferedSkills>Skills I Can Offer:</OfferedSkills>
      <ul>
        <SkillLi style={{ borderRadius: "5px 5px 0px 0px" }}>media</SkillLi>

        <SkillLi style={{ borderRadius: "0px 0px 5px 5px" }}>media</SkillLi>
      </ul>
      <ViewBtn>View Listing</ViewBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  width: 230px;
  padding: 25px;
  border-radius: 15px;
  transition: 0.2s ease-in;
  margin: 30px;
`;

const Avatar = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  align-self: center;
  margin-top: -100px;
  background-color: #f3f3f3;
`;

const LikeContainer = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
`;

const Heart = styled(HiOutlineHeart)`
  color: #f3f3f3;
`;

const Status = styled.h3`
  text-align: center;
  background-color: #f3f3f3;
  color: #f3f3f3;
  border-radius: 15px;
`;

const OfferedSkills = styled.h4`
  background-color: #f3f3f3;
  color: #f3f3f3;
  margin-bottom: 5px;
  font-size: 16px;
  border-radius: 15px;
`;

const ViewBtn = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #f3f3f3;
  color: #f3f3f3;
  padding: 10px;
  align-self: center;
  width: 60%;
  margin-top: 30px;
`;

const SkillLi = styled.li`
  background-color: #f3f3f3;
  color: #f3f3f3;
`;

export default UserCard;
