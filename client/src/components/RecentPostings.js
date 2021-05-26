import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RecentPostings = () => {
  // const [state, setState] = useState([])

  // useEffect(() => {
  //     fetch("/", req, res => {

  //     })
  // }, [])

  return (
    <Wrapper>
      <h3>Seeking Help With My Social Media</h3>
      <h4>Skills I Can Offer:</h4>
      <ul>
        <li>coding</li>
        <li>website debugging</li>
        <li>optimize website speed</li>
      </ul>
      <button>view listing</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
`;

export default RecentPostings;
