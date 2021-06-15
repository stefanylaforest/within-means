import React, { useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { colors } from "../GlobalStyles";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";

const UserCard = ({ user, setRemoveSaved }) => {
  let userId = user._id;
  const history = useHistory();
  const location = useLocation();
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
        setCurrentLoggedInUser(data.data);
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data.data));
      });
  };

  const handleRemoveSave = (e) => {
    if (location.pathname.includes("save")) {
      setRemoveSaved(user._id);
    }

    e.preventDefault();
    e.stopPropagation();
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
        setCurrentLoggedInUser(data.data);
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data.data));
      });
  };

  return (
    <Link exact to={currentLoggedInUser ? `/users/${userId}` : `/register`}>
      <Wrapper
        style={{
          boxShadow:
            currentLoggedInUser &&
            location.pathname === `/users/${currentLoggedInUser._id}/saved`
              ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
              : " ",
        }}
      >
        <object>
          <LikeContainer>
            {currentLoggedInUser &&
            currentLoggedInUser.saved !== null &&
            currentLoggedInUser.saved.includes(userId) ? (
              <FilledHeart onClick={handleRemoveSave} />
            ) : (
              <EmptyHeart onClick={handleSave} />
            )}
          </LikeContainer>
        </object>

        <Avatar src={user?.avatar} />
        {user.status ? (
          <Status>{user.status.slice(0, 58)}...</Status>
        ) : (
          <Status>I need help with my social media</Status>
        )}
        <OfferedSkills>Skills I Can Offer:</OfferedSkills>
        <SkillsContainer>
          {user.skills.length > 0 &&
            user.skills?.map((skill) => {
              return <SkillLi key={`id-${skill}`}>{skill}</SkillLi>;
            })}
        </SkillsContainer>
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
  height: 320px;
  width: 230px;
  padding: 25px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
  transition: 0.5s ease-in-out;
  &:hover {
    /* background-color: #f9f9f9; */
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  align-self: center;
  margin-top: -100px;
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
  border-radius: 50%;
  transition: 0.25s;
  &:hover {
    fill: ${colors.coral};
  }
  &:active {
    transform: scale(2);
    fill: ${colors.coral};
  }
  &:active:after {
    transform: scale(2);
    fill: ${colors.coral};
  }
`;

const FilledHeart = styled(HiHeart)`
  color: ${colors.coral};
  transition: 0.25s;
  &:active {
    transform: scale(2);
  }
`;

const Status = styled.h3`
  text-align: center;
  height: 55px;
  padding: 10px;
  margin: 20px 0px;
  overflow: hidden;
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
  font-size: 14px;
`;

const SkillsContainer = styled.ul`
  min-height: 72px;
`;

const SkillLi = styled.li`
  text-transform: capitalize;
`;

export default UserCard;
