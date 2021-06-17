import React from "react";
import { colors } from "../GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import learn from "../assets/learn.jpg";
import learn2 from "../assets/learn-2.jpg";

const About = () => {
  return (
    <Wrapper>
      <Section>
        <Image src={learn} alt="man sitting on a computer" />

        <WritingDiv>
          <Headlines>Your Talent Is Someone's Weakness</Headlines>
          <p>We know as a small buisness owner, it's hard to learn it all.</p>
          <p>
            Within Means is a space for you to swap your services for free in
            return for another, as we understand that sometimes, specific
            services can be outside of your budget.
          </p>
        </WritingDiv>
      </Section>
      <SectionTwo>
        <WritingDivTwo>
          <Headlines>The currency here is your skill set. </Headlines>
          <p>
            Pay with what you can do, rather than with what you can afford.{" "}
          </p>
        </WritingDivTwo>
        <Image2 src={learn2} alt="two people laughing" />
      </SectionTwo>

      <CallToAction>
        <div>
          <h2>
            You no longer need to wait for your business to be profitable to be
            able to scale.
          </h2>
          <Link exact to="/register">
            <SignUp>Start Swapping</SignUp>
          </Link>
        </div>
      </CallToAction>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 525px) {
    margin: 20px;
    margin: 0 auto;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px 100px;
  @media screen and (max-width: 785px) {
    text-align: center;
    margin: 0 auto;
  }

  @media screen and (max-width: 525px) {
    margin: 100px 10px;
  }
`;

const SectionTwo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
  flex-wrap: wrap-reverse;
  margin: 50px 100px;

  @media screen and (max-width: 785px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const Image = styled.img`
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 28px -12px;
  @media screen and (max-width: 785px) {
    margin: 0 auto;
  }

  @media screen and (max-width: 525px) {
    width: 80vw;
  }
`;

const Image2 = styled.img`
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 28px -12px;
  @media screen and (max-width: 785px) {
    width: 400px;
    margin: 0 auto;
  }

  @media screen and (max-width: 525px) {
    width: 80vw;
  }
`;

const Headlines = styled.h2`
  color: ${colors.darkPurple};
`;

const WritingDiv = styled.div`
  flex: 2;
  padding: 0px 40px;
`;

const SignUp = styled.button`
  margin: 0px 20px;
  border-radius: 6px;
  padding: 25px 40px;
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  background-color: ${colors.darkPurple};
  color: white;
  font-weight: bold;
  transition: 1s ease;
  background-size: 200% auto;
  &:hover {
    background-position: right center;
    background-image: linear-gradient(
      to right,
      #3641e7 0%,
      #7279de 51%,
      #3641e7 100%
    );
    color: white;
  }
`;

const WritingDivTwo = styled.div`
  flex: 1;
  padding: 0px 40px;
`;

const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 100px;
  padding: 100px;
  border-radius: 20px;
  @media screen and (max-width: 525px) {
    margin: 100px 30px;
    padding: 0px;
  }
`;

export default About;
