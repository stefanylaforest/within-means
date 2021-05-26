import React from "react";
import styled from "styled-components";
import { colors } from "../GlobalStyles";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div>
      <Container>
        <p>
          Break all barriers that are stopping you from growing your business.
        </p>
        <Heading>Trade Talent on Within Means</Heading>
      </Container>
      <Form>
        <InputGroup>
          <StyledSearchIcon />
          <SearchBar type="text" placeholder={`Type "I Need a Brand Design"`} />
          <SearchBtn>Search</SearchBtn>
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
  font-size: 16px;
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
`;

const Suggested = styled.div`
  display: flex;
  justify-content: center;
`;

const SuggestedBtn = styled.button`
  border: 1.5px solid ${colors.darkPurple};
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
