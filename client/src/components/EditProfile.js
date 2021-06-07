import React, { useContext, useState, useEffect } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  // let { userId } = useParams();
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [userSkills, setUserSkills] = useState([]);

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

  const editProfile = () => {
    fetch(`/api/users/${currentLoggedInUser._id}/edit`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, newEmail, title, website, bio }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
      });
  };

  console.log(
    "name:",
    name,
    "email",
    newEmail,
    "title",
    title,
    "website:",
    website,
    "bio",
    bio
  );

  return (
    <FormGroup>
      <label for="name">Name:</label>
      <input
        type="text"
        defaultValue={currentLoggedInUser.name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label for="email">Email:</label>
      <input
        type="email"
        contentEditable="true"
        defaultValue={currentLoggedInUser.email}
        onChange={(ev) => setNewEmail(ev.target.value)}
      />
      {/* 
      <label for="password">Password:</label>
      <input type="password" /> */}

      <label for="title">Title:</label>
      <input
        type="text"
        defaultValue={currentLoggedInUser.title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label for="skills">Skills: (List 3)</label>

      <label for="skill-one">Skill 1:</label>
      <input
        name="skill-one"
        type="text"
        // defaultValue={
        //   currentLoggedInUser.skills !== null
        //     ? currentLoggedInUser.skills[0]
        //     : "add a skill"
        // }
        // onChange={(ev) => setUserSkills(...userSkills, ev.target.value)}
      />

      <label for="skill-two">Skill 2:</label>
      <input
        name="skill-two"
        type="text"
        // defaultValue={
        //   currentLoggedInUser.skills !== null
        //     ? currentLoggedInUser.skills[1]
        //     : "add a skill"
        // }
        // onChange={(ev) => setUserSkills(...userSkills, ev.target.value)}
      />

      <label for="skill-three">Skill 3:</label>
      <input
        name="skill-three"
        type="text"
        // defaultValue={
        //   currentLoggedInUser.skills !== null
        //     ? currentLoggedInUser.skills[2]
        //     : "add a skill"
        // }
        // onChange={
        //   ((ev) => setUserSkills(...userSkills, ev.target.value),
        //   handleFormChange(userSkills, "skills"))
        // }
      />

      <label for="website">Website:</label>
      <input
        type="text"
        defaultValue={currentLoggedInUser.website}
        onChange={(ev) => setWebsite(ev.target.value)}
      />

      <label for="bio">
        Write a brief description about what you do or who you are:
      </label>
      <input
        type="text-area"
        defaultValue={currentLoggedInUser.bio}
        onChange={(ev) => setBio(ev.target.value)}
      />
      <button onClick={editProfile}>save</button>
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EditProfile;
