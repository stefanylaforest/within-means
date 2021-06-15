import React, { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import { colors } from "../GlobalStyles";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaPenFancy, FaPhotoVideo } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiCodeBlock } from "react-icons/bi";
import { GiSpellBook } from "react-icons/gi";

const Categories = () => {
  const { setQuery } = useContext(SearchContext);
  const history = useHistory();

  return (
    <Wrapper>
      <CategoriesWrapper>
        <h2>Explore by categories</h2>
        <Cats>
          <Odd
            onClick={(e) => {
              e.preventDefault();
              setQuery("desgin");
              history.push(`/search/design`);
            }}
          >
            <StyledPenIcon>{FaPenFancy}</StyledPenIcon>
            Design
          </Odd>
          <Even
            onClick={(e) => {
              e.preventDefault();
              setQuery("martketing");
              history.push(`/search/marketing`);
            }}
          >
            <StyledMarketing>{DiGoogleAnalytics}</StyledMarketing>
            Marketing
          </Even>
          <Odd
            onClick={(e) => {
              e.preventDefault();
              setQuery("coding");
              history.push(`/search/coding`);
            }}
          >
            <StyledCode>{BiCodeBlock}</StyledCode>
            Coding
          </Odd>
          <Even>
            <StyledPhoto
              onClick={(e) => {
                e.preventDefault();
                setQuery("editing");
                history.push(`/search/photo%20video`);
              }}
            >
              {FaPhotoVideo}
            </StyledPhoto>
            Editing
          </Even>
          <Odd
            onClick={(e) => {
              e.preventDefault();
              setQuery("writing");
              history.push(`/search/writing`);
            }}
          >
            {" "}
            <StyledBook>{GiSpellBook}</StyledBook>
            Writing
          </Odd>
        </Cats>
      </CategoriesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoriesWrapper = styled.div`
  margin: 100px 0px;

  text-align: center;
`;

const Cats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 100px 0px;
`;

const Odd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px 40px 30px 40px;
  margin: 30px;
  height: 100px;
  width: 100px;
  justify-content: center;
  border-radius: 20px;
  transition: 0.5s ease-in-out;
  color: ${colors.navy};
  cursor: pointer;
  &:hover {
    color: ${colors.mediumPurple};
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const StyledPenIcon = styled(FaPenFancy)`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StyledMarketing = styled(DiGoogleAnalytics)`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StyledCode = styled(BiCodeBlock)`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StyledPhoto = styled(FaPhotoVideo)`
  font-size: 40px;
  margin-bottom: 10px;
`;

const StyledBook = styled(GiSpellBook)`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Even = styled.div`
  color: ${colors.navy};
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 40px 40px 30px 40px;
  height: 100px;
  width: 100px;
  border-radius: 20px;
  transition: 0.3s ease;
  cursor: pointer;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  &:hover {
    color: ${colors.mediumPurple};
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

export default Categories;
