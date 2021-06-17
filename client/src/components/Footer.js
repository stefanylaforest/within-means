import React from "react";
import styled from "styled-components";
import WithinMeansLogo from "../assets/WithinMeansLogo";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      transition: "all 0.5s ease 0s",
    });
  };
  return (
    <Wrapper>
      <Link onClick={handleScrollToTop} to="/">
        <h1>
          <LogoSpan>
            <WithinMeansLogo />
          </LogoSpan>
        </h1>
      </Link>
      <AllRightsReserved>
        © 2021 Within Means. All rights reserved. - Made with ❤️ by{" "}
        <a href="https://www.github.com/stefanylaforest" target="blank">
          Stefany Laforest
        </a>
      </AllRightsReserved>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  margin-bottom: 60px;
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
