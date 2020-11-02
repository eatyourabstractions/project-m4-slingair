import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  let retrievedStr = localStorage.getItem('currentUserInfo') 
  let currentUser = JSON.parse(retrievedStr)
  return (
      <Wrapper>
        <Mydiv>
          <h1>Your reservation is confirmed</h1>
          <Hr/>
          <P><Bold>Reservation #:</Bold>{currentUser.id}</P>
          <P><Bold>Flight #:</Bold>{currentUser.flight}</P>
          <P><Bold>Seat #:</Bold>{currentUser.seat}</P>
          <P><Bold>Name:</Bold>{currentUser.givenName}</P>
          <P><Bold>Email #:</Bold>{currentUser.email}</P>
        </Mydiv>
        <Img src={tombstone} alt="" />
      </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Hr = styled.hr`
  border: 1px solid red;
`

const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 150px;
`;
const Mydiv = styled.div`
  border: 1px solid #FF0000;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
`;
const Bold = styled.span`
font-weight:bold;
`;
const P = styled.p`
  margin: 10px 0px 10px 0px;
`;

export default Confirmation;
