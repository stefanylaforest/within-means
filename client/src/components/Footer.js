import React from "react";
import styled from "styled-components";
import WithinMeansLogo from "../assets/WithinMeansLogo";
import { Link } from "react-router-dom";
import { colors } from "../GlobalStyles";

const Footer = () => {
  return (
    <Wrapper>
      {/* <Divider /> */}
      <Link to="/">
        <h1>
          <LogoSpan>
            <WithinMeansLogo />
          </LogoSpan>
        </h1>
      </Link>
      <AllRightsReserved>
        © 2021 Within Means. All rights reserved.
      </AllRightsReserved>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
`;

const Divider = styled.hr`
  border: 1px solid ${colors.darkPurple};
  width: 100%;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const AllRightsReserved = styled.p`
  text-align: center;
`;

const LogoSpan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  justify-content: center;
`;

export default Footer;