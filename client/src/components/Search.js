import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { colors } from "../GlobalStyles";
import { ImSearch, ImArrowRight2 } from "react-icons/im";
import { UsersContext } from "./UsersContext";
import { SearchContext } from "./SearchContext";
import { useHistory, useParams } from "react-router-dom";

const Search = () => {
  const { users } = useContext(UsersContext);
  const { query, setQuery, matchedUsers, setMatchedUsers } =
    useContext(SearchContext);
  const history = useHistory();

  const mainQueryHandler = (e) => {
    e.preventDefault();
    if (query) {
      history.push(`/search/${query}`);
    }
  };

  console.log("query", query);

  return (
    <div>
      <Container>
        <p>
          Break the barriers that are stopping you from growing your business.
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
            aria-label="search"
            onClick={(e) => {
              mainQueryHandler(e);
            }}
          >
            <ImArrowRight2 />
          </SearchBtn>
        </InputGroup>
        <Suggested>
          <p>Popular: </p>
          <SuggestedBtn
            onClick={(e) => {
              e.preventDefault();
              setQuery("photo editing");
              history.push(`/search/photo%20editing`);
            }}
          >
            photo editing
          </SuggestedBtn>
          <SuggestedBtn
            onClick={(e) => {
              e.preventDefault();
              setQuery("copy writing");
              history.push(`/search/copy%20writing`);
            }}
          >
            copy writing
          </SuggestedBtn>
          <SuggestedBtn
            onClick={(e) => {
              e.preventDefault();
              setQuery("digital marketing");
              history.push(`/search/digital%20marketing`);
            }}
          >
            digital marketing
          </SuggestedBtn>
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
  font-size: 30px;
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

const StyledSearchIcon = styled(ImSearch)`
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
  background-color: transparent;
  height: 100%;
  border: none;
  font-size: 18px;
  color: ${colors.darkPurple};
  border-radius: 30px;
  padding: 5px 18px 0px 0px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: ${colors.mediumPurple};
  }
`;

const Suggested = styled.div`
  display: flex;
  justify-content: center;
`;

const SuggestedBtn = styled.button`
  border: 3px solid ${colors.darkPurple};
  border-radius: 40px;
  font-size: 14px;
  padding: 0px 10px;
  margin: 10px;
  background-color: transparent;
  color: ${colors.darkPurple};
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: ${colors.darkPurple};
    color: white;
  }
`;

export default Search;
