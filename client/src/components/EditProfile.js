import React, { useContext, useState } from "react";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import styled, { keyframes } from "styled-components";
import { colors } from "../GlobalStyles";

const EditProfile = () => {
  const { currentLoggedInUser, setCurrentLoggedInUser, updated, setUpdated } =
    useContext(LoggedInUserContext);

  let defaultValueOne = currentLoggedInUser.skills
    ? currentLoggedInUser.skills[0] !== null
      ? currentLoggedInUser.skills[0]
      : null
    : null;

  let defaultValueTwo = currentLoggedInUser.skills
    ? currentLoggedInUser.skills[1] !== null
      ? currentLoggedInUser.skills[1]
      : null
    : null;

  let defaultValueThree = currentLoggedInUser.skills
    ? currentLoggedInUser.skills[2] !== null
      ? currentLoggedInUser.skills[2]
      : null
    : null;

  //profile
  const [name, setName] = useState(currentLoggedInUser.name);
  const [newEmail, setNewEmail] = useState(currentLoggedInUser.email);
  const [title, setTitle] = useState(currentLoggedInUser.title);
  const [website, setWebsite] = useState(currentLoggedInUser.website);
  const [bio, setBio] = useState(currentLoggedInUser.bio);

  //successfully edited on save alert
  const [alert, setAlert] = useState();

  //skills
  const [skillOne, setSkillOne] = useState(defaultValueOne);
  const [skillTwo, setSkillTwo] = useState(defaultValueTwo);
  const [skillThree, setSkillThree] = useState(defaultValueThree);

  const editProfile = () => {
    fetch(
      `https://secure-journey-19068.herokuapp.com/api/users/${currentLoggedInUser._id}/edit`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: newEmail,
          title,
          website,
          bio,
          skills: [skillOne, skillTwo, skillThree],
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setCurrentLoggedInUser(json.data);
        setAlert("Profile Updated Successfully");
        localStorage.setItem("currentLoggedInUser", JSON.stringify(json.data));
        window.scrollTo(0, 0);
        setTimeout(() => {
          setAlert(null);
        }, 8000);
        setUpdated(!updated);
      });
  };

  return (
    <FormGroup>
      <h1>Edit Profile</h1>
      <Divider />
      {alert !== null && <Alert>{alert}</Alert>}
      <label htmlFor="name">Name:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <Input
        type="email"
        contentEditable="true"
        defaultValue={currentLoggedInUser.email}
        onChange={(ev) => setNewEmail(ev.target.value)}
      />
      {/* 
      <label htmlFor="password">Password:</label>
      <Input type="password" /> */}

      <label htmlFor="title">Title:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label htmlFor="website">Website:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.website}
        onChange={(ev) => setWebsite(ev.target.value)}
      />

      <label htmlFor="skills">List Your Skills: (List 3)</label>
      <BioAndSkillsWrapper>
        <SkillsWrapper>
          <LabelInputDiv>
            <SkillsLabel htmlFor="skill-one">Skill 1</SkillsLabel>
            <Input
              name="skill-one"
              type="text"
              defaultValue={defaultValueOne}
              onChange={(ev) => setSkillOne(ev.target.value)}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <SkillsLabel htmlFor="skill-two">Skill 2</SkillsLabel>
            <Input
              name="skill-two"
              type="text"
              defaultValue={defaultValueTwo}
              onChange={(ev) => setSkillTwo(ev.target.value)}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <SkillsLabel htmlFor="skill-three">Skill 3</SkillsLabel>
            <Input
              name="skill-three"
              type="text"
              defaultValue={defaultValueThree}
              onChange={(ev) => setSkillThree(ev.target.value)}
            />
          </LabelInputDiv>
        </SkillsWrapper>
        <BioWrapper>
          <label htmlFor="bio">
            Write a brief description about what you do or who you are:
          </label>
          <BioTextArea
            defaultValue={currentLoggedInUser.bio}
            onChange={(ev) => setBio(ev.target.value)}
          />
        </BioWrapper>
      </BioAndSkillsWrapper>
      <SaveBtn onClick={editProfile}>Save Profile</SaveBtn>
    </FormGroup>
  );
};

const fadeIn = keyframes`
   0% {
    opacity: 0;
   }
 
    100% {
    opacity: 1;

    }`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  animation: ${fadeIn} 0.3s ease-in;
  @media screen and (max-width: 950px) {
    margin: 0px 50px 50px 50px;
  }
  @media screen and (max-width: 525px) {
    margin: 10px;
  }
`;

const Divider = styled.hr`
  border: 1px solid #f0f0f0;
  width: 100%;
  margin-bottom: 30px;
  margin-top: -10px;
`;

const LabelInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
`;

const SkillsLabel = styled.label`
  font-size: 20px;
  color: ${colors.mediumPurple};
  margin-right: 10px;
`;

const Input = styled.input`
  background: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: 16px;
  padding: 10px 16px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  &:focus,
  &:hover {
    border: 1px solid ${colors.mediumPurple};
    background: white;
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    outline: none;
  }
`;

const BioAndSkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BioTextArea = styled.textarea`
  background: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
  margin-top: 3px;
  font-size: 16px;
  padding: 10px 16px;
  transition: 0.3s ease-in-out;
  height: 200px;
  &:focus,
  &:hover {
    border: 1px solid ${colors.mediumPurple};
    background: white;
    -webkit-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    -moz-box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    box-shadow: 0px 0px 0px 4px rgb(68, 78, 229, 15%);
    outline: none;
  }
`;

const SaveBtn = styled.button`
  font-size: 18px;
  padding: 15px;
  background-color: ${colors.darkPurple};
  color: white;
  cursor: pointer;
  border: none;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.mediumPurple};
  }
`;

const Alert = styled.p`
  color: #53bb8f;
  margin-top: -20px;
`;

export default EditProfile;
