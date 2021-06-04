import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { colors } from "../GlobalStyles";
import { BsSearch } from "react-icons/bs";
import { UsersContext } from "./UsersContext";
import { useHistory, useParams } from "react-router-dom";

const Search = () => {
  const { users, matchedUsers, setMatchedUsers } = useContext(UsersContext);
  const [query, setQuery] = useState("");
  const history = useHistory();
  // let { userQuery } = useParams();

  const queryHandler = (e) => {
    e.preventDefault();
    const matches = users.map((user) => {
      let matchSkill = false;
      user.skills.forEach((userSkill) => {
        if (userSkill.toLowerCase().includes(query.toLowerCase())) {
          matchSkill = true;
        } else {
          matchSkill = false;
        }
      });
      if (
        matchSkill === true ||
        user.bio.toLowerCase().includes(query.toLowerCase())
      ) {
        return user;
      }
    });
    const matchedFilter = matches.filter((match) => match !== undefined);
    setMatchedUsers(matchedFilter);
    history.push(`/search-results`);
  };

  // console.log(matchedUsers);
  return (
    <div>
      <Container>
        <p>
          Break all the barriers that are stopping you from growing your
          business.
        </p>
        <Heading>Trade Talent on Within Means</Heading>
      </Container>
      <Form>
        <InputGroup>
          <StyledSearchIcon />
          <SearchBar
            type="text"
            placeholder={`Type "Brand Design"`}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchBtn
            onClick={(e) => {
              queryHandler(e);
            }}
          >
            Search
          </SearchBtn>
        </InputGroup>
        <Suggested>
          <p>Popular: </p>
          <SuggestedBtn>photo editing</SuggestedBtn>
          <SuggestedBtn>copy writing</SuggestedBtn>
          <SuggestedBtn>digital marketing</SuggestedBtn>
        </Suggested>
      </Form>
    </div>
  );
};

const Container = styled.div`
  text-align: center;
  justify-content: center;
`;

const Heading = styled.h2`
  color: ${colors.darkPurple};
  margin-bottom: 40px;
`;

const Form = styled.form``;

const InputGroup = styled.div`
  margin: 0 auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 40px;
  background: white;
  width: auto;
  max-width: 584px;
`;

const StyledSearchIcon = styled(BsSearch)`
  color: ${colors.darkPurple};
  font-size: 20px;
  margin: 0px 10px 0px 20px;
`;

const SearchBar = styled.input`
  margin: 0 auto;
  width: 90%;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  background: ${colors.mediumPurple};
  height: 100%;
  border: none;
  color: white;
  border-radius: 30px;
  padding: 0px 18px;
  flex-wrap: wrap;
  cursor: pointer;
  &:hover {
    background-color: ${colors.darkPurple};
    color: white;
  }
`;

const Suggested = styled.div`
  display: flex;
  justify-content: center;
`;

const SuggestedBtn = styled.button`
  border: 3px solid ${colors.darkPurple};
  border-radius: 40px;
  padding: 0px 10px;
  margin: 10px;
  background-color: transparent;
  color: ${colors.darkPurple};
  cursor: pointer;
  &:hover {
    background-color: ${colors.darkPurple};
    color: white;
  }
`;

export default Search;
