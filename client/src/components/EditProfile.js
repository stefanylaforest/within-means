import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import { colors } from "../GlobalStyles";

const EditProfile = () => {
  const {
    currentLoggedInUser,
    setCurrentLoggedInUser,
    loggedIn,
    setLoggedIn,
    errMsg,
    setErrMsg,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(LoggedInUserContext);

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

  const [name, setName] = useState(currentLoggedInUser.name);
  const [newEmail, setNewEmail] = useState(currentLoggedInUser.email);
  const [title, setTitle] = useState(currentLoggedInUser.title);
  const [website, setWebsite] = useState(currentLoggedInUser.website);
  const [bio, setBio] = useState(currentLoggedInUser.bio);

  //skills
  const [skillOne, setSkillOne] = useState(defaultValueOne);
  const [skillTwo, setSkillTwo] = useState(defaultValueTwo);
  const [skillThree, setSkillThree] = useState(defaultValueThree);

  const editProfile = () => {
    fetch(`/api/users/${currentLoggedInUser._id}/edit`, {
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        setCurrentLoggedInUser(data.data);
      });
  };

  return (
    <FormGroup>
      <h1>Edit Profile</h1>
      <Divider />
      <label for="name">Name:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label for="email">Email:</label>
      <Input
        type="email"
        contentEditable="true"
        defaultValue={currentLoggedInUser.email}
        onChange={(ev) => setNewEmail(ev.target.value)}
      />
      {/* 
      <label for="password">Password:</label>
      <Input type="password" /> */}

      <label for="title">Title:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label for="website">Website:</label>
      <Input
        type="text"
        defaultValue={currentLoggedInUser.website}
        onChange={(ev) => setWebsite(ev.target.value)}
      />

      <label for="skills">Skills: (List 3)</label>
      <BioAndSkillsWrapper>
        <SkillsWrapper>
          <LabelInputDiv>
            <SkillsLabel for="skill-one">Skill 1</SkillsLabel>
            <Input
              name="skill-one"
              type="text"
              defaultValue={defaultValueOne}
              onChange={(ev) => setSkillOne(ev.target.value)}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <SkillsLabel for="skill-two">Skill 2</SkillsLabel>
            <Input
              name="skill-two"
              type="text"
              defaultValue={defaultValueTwo}
              onChange={(ev) => setSkillTwo(ev.target.value)}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <SkillsLabel for="skill-three">Skill 3</SkillsLabel>
            <Input
              name="skill-three"
              type="text"
              defaultValue={defaultValueThree}
              onChange={(ev) => setSkillThree(ev.target.value)}
            />
          </LabelInputDiv>
        </SkillsWrapper>
        <BioWrapper>
          <label for="bio">
            Write a brief description about what you do or who you are:
          </label>
          <BioTextArea
            defaultValue={currentLoggedInUser.bio}
            onChange={(ev) => setBio(ev.target.value)}
          />
        </BioWrapper>
      </BioAndSkillsWrapper>
      <SaveBtn onClick={editProfile}>Save</SaveBtn>
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
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
  margin-bottom: 30px;
  margin-top: 3px;
  font-size: 16px;
  padding: 10px 16px;
  transition: 0.3s ease-in-out;

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

export default EditProfile;
