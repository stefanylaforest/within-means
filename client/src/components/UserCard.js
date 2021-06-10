import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { colors } from "../GlobalStyles";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { LoggedInUserContext } from "./LoggedInUserContext";

const UserCard = ({ user }) => {
  let userId = user._id;
  const history = useHistory();

  const { currentLoggedInUser, setCurrentLoggedInUser } =
    useContext(LoggedInUserContext);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentLoggedInUser) {
      return history.push(`/login`);
    }
    fetch(`/api/users/${currentLoggedInUser._id}/save`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saved: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        setCurrentLoggedInUser(data.data);
      });
  };

  const handleRemoveSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (!currentLoggedInUser) {
    //   return history.push(`/login`);
    // }
    fetch(`/api/users/${currentLoggedInUser._id}/save/remove`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saved: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        setCurrentLoggedInUser(data.data);
      });
  };

  return (
    <Link exact to={`/users/${userId}`}>
      <Wrapper>
        <object>
          {currentLoggedInUser &&
          currentLoggedInUser.saved !== null &&
          currentLoggedInUser.saved.includes(userId) ? (
            <LikeContainer onClick={handleRemoveSave}>
              <FilledHeart />
            </LikeContainer>
          ) : (
            <LikeContainer onClick={handleSave}>
              <EmptyHeart />
            </LikeContainer>
          )}
        </object>
        <Avatar src={user?.avatar} />
        {user.status ? (
          <Status>{user.status.slice(0, 58)}...</Status>
        ) : (
          <Status>I need help with my social media</Status>
        )}
        <OfferedSkills>Skills I Can Offer:</OfferedSkills>
        <ul>
          {user.skills !== null &&
            user.skills.map((skill) => {
              return (
                <SkillLi key={`id-${skill}`}>
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </SkillLi>
              );
            })}
        </ul>
        <ViewBtn>View Listing</ViewBtn>
      </Wrapper>
    </Link>
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

const EmptyHeart = styled(HiOutlineHeart)`
  color: ${colors.coral};
  &:hover {
    fill: ${colors.coral};
  }
`;

const FilledHeart = styled(HiHeart)`
  color: ${colors.coral};

  /* fill: ${colors.coral}; */
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

export default UserCard;
