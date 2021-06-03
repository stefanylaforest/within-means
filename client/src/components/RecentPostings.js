import React from "react";
import styled from "styled-components";
import { colors } from "../GlobalStyles";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const RecentPostings = ({ user }) => {
  return (
    <Wrapper>
      <LikeContainer>
        <Heart />
      </LikeContainer>
      <Avatar src={user.avatar} />
      {user.status ? (
        <h3>{user.status.slice(0, 62)}...</h3>
      ) : (
        <Status>I need help with my social media</Status>
      )}
      <OfferedSkills>Skills I Can Offer:</OfferedSkills>
      <ul>
        {user.skills.map((skill, i) => {
          return (
            <SkillLi key={`id-${(skill, i)}`}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </SkillLi>
          );
        })}
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
  cursor: pointer;
  &:hover {
    margin-top: -10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  align-self: center;
  margin-top: -70px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const LikeContainer = styled.div`
  cursor: pointer;
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
`;

const Heart = styled(HiOutlineHeart)`
  color: ${colors.coral};
  &:hover {
    fill: ${colors.coral};
  }
`;

const Status = styled.h3`
  text-align: center;
`;

const OfferedSkills = styled.h4`
  color: ${colors.darkPurple};
  margin-bottom: 5px;
  font-size: 16px;
`;

const ViewBtn = styled.button`
  border-radius: 20px;
  border: none;
  background-color: ${colors.mediumPurple};
  color: white;
  cursor: pointer;
  padding: 10px;
  align-self: center;
  width: 60%;
  margin-top: 20px;
`;

const SkillLi = styled.li``;

export default RecentPostings;
