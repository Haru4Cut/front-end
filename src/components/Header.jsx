import React, { useState, useEffect } from "react";
import styled from "styled-components";
import calendarIcon from "../assets/images/calendarIcon.svg";
import mypageIcon from "../assets/images/MyPageIcon.svg";

export default function Header() {
  return (
    <HeaderWrap>
      <Haru4cutLogo>Haru4cut</Haru4cutLogo>
      <IconWrap>
        <CalendarIcon src={calendarIcon} />
        <img src={mypageIcon} />
      </IconWrap>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  margin: 40px 60px 21px 60px;
  align-items: center;
  width: 80%;
`;

const Haru4cutLogo = styled.div`
  font-family: "PoetsenOne";
  font-size: 30px;
  color: #4a4a4a;
`;
const CalendarIcon = styled.img`
  margin-right: 5px;
`;
const IconWrap = styled.div`
  display: flex;
  float: right;
  margin-left: auto;
`;
