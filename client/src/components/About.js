import React from "react";
import { colors } from "../GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>Your Talent Is Someone's Weakness</h2>
      <p>We know as a small buisness owner, it's hard to learn it all.</p>
      <p>
        Within Means is a space for you to swap your services for free in return
        for another, as we understand that sometimes, specific services can be
        outside of your budget.
      </p>
      <h2>Grow Bigger, Faster</h2>
      <p>Exchange knowledge and build a community</p>

      <div>
        <h2>How It Works</h2>
        <ul>
          <li>Sign up for an account</li>
          <li>Search for something you feel your business needs</li>
          <li>Reach out to the person</li>
          <li>and discuss how you can help one another</li>
        </ul>
      </div>

      <p>
        The currency here is your skill set. Pay with what you can do, rather
        than with what you can afford
      </p>

      <h3>
        You no longer need to wait for your business to be profitable to be able
        to scale.
      </h3>
      <div>SIGN UP</div>
    </div>
  );
};

export default About;
