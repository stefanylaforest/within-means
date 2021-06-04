import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UsersContext } from "./UsersContext";
import { useParams, useHistory } from "react-router-dom";
import { colors } from "../GlobalStyles";
import Loading from "./Loaders/Loading";
import { HiOutlineHeart } from "react-icons/hi";
import { ImArrowLeft2 } from "react-icons/im";
import moment from "moment";

const UserDetails = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [currentUserStatus, setCurrentUserStatus] = useState(true);
  const [error, setError] = useState();

  const history = useHistory();
  let { userId } = useParams();

  //   let today = new Date();
  //   let lastUpdatedStatus = Date.parse(currentUser.statusDate);
  //   console.log("date::", today - lastUpdatedStatus);

  const goBackHandler = () => {
    history.goBack();
    console.log(history);
  };

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((rest) => rest.json())
      .then((json) => {
        setCurrentUser(json.data);
        setCurrentUserStatus(false);
        setUserSkills(json.data.skills);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  console.log("viewing user", currentUser);
  console.log("skills", userSkills);

  if (currentUserStatus) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <GoBack onClick={goBackHandler}>
        <GoBackIcon />
        Go back
      </GoBack>

      <Wrapper>
        <SaveBtn>
          <Heart />
        </SaveBtn>
        <UserSpecs>
          <Avatar src={currentUser.avatar} />
          <Column>
            <Status>{currentUser.status}</Status>
            <Row>
              <div>
                <LastUpdated>
                  Last updated{" "}
                  {moment(currentUser.date).startOf("day").fromNow()}
                </LastUpdated>
                <NameTitleWeb>👋 I'm {currentUser.name}</NameTitleWeb>
                <NameTitleWeb>💻 I am a {currentUser.title}</NameTitleWeb>
                <NameTitleWeb>🔗 {currentUser.website}</NameTitleWeb>
              </div>
              <div>
                <SkillsTitle>Skills I Can Offer:</SkillsTitle>
                <ul>
                  {userSkills &&
                    userSkills.map((skill, i) => {
                      return (
                        <li key={`id-${(skill, i)}`}>
                          {skill.charAt(0).toUpperCase() + skill.slice(1)}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Row>
          </Column>
        </UserSpecs>
        <Bio>Bio</Bio>
        <p>{currentUser.bio}</p>
        <SendOfferBtn>Send an offer to {currentUser.name}</SendOfferBtn>
      </Wrapper>
    </div>
  );
};

const GoBack = styled.p`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  color: ${colors.darkPurple};
  width: 200px;
  cursor: pointer;
  margin: 0px 50px 50px 50px;
`;

const GoBackIcon = styled(ImArrowLeft2)`
  font-size: 1.2em;
  color: ${colors.darkPurple};
  margin-right: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  padding: 50px 70px 70px 70px;
  margin: 0 auto;
  background-color: white;
  border-radius: 25px;
`;

const UserSpecs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LastUpdated = styled.p`
  color: gray;
  font-size: 0.8em;
  margin-bottom: -10px;
`;

const NameTitleWeb = styled.p`
  margin-bottom: -10px;
`;

const SkillsTitle = styled.h3`
  color: ${colors.darkPurple};
`;

const Bio = styled.h3`
  margin-bottom: -10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 100px 0px 30px;
`;

const SaveBtn = styled.div`
  cursor: pointer;
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
`;

const Heart = styled(HiOutlineHeart)`
  cursor: pointer;
  color: ${colors.coral};
  &:hover {
    fill: ${colors.coral};
  }
`;

const Avatar = styled.img`
  width: 230px;
  border-radius: 50%;
`;

const Status = styled.h1`
  font-size: 1.5em;
  margin: 0px 30px;
  color: ${colors.darkPurple};
`;

const SendOfferBtn = styled.button`
  background-color: ${colors.darkPurple};
  color: white;
  border: none;
  border-radius: 26px;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  &:hover {
  }
`;

export default UserDetails;
