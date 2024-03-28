import React, { useState, useEffect } from "react";
import styled from "styled-components";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import mypageIcon from "../../assets/images/MyPageIcon.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderWrap>
      <Haru4cutLogo to="/">Haru4cut</Haru4cutLogo>
      <IconWrap>
        <Link to="/calendar">
          <Icon src={calendarIcon} marginTop="2px" />
        </Link>
        <Link to="/mypage">
          <Icon src={mypageIcon} />
        </Link>
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

const Haru4cutLogo = styled(Link)`
  font-family: "PoetsenOne";
  font-size: 30px;
  color: #4a4a4a;
  cursor: pointer;
  text-decoration: none;
`;
const Icon = styled.img`
  cursor: pointer;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.marginTop || "0px"};
`;
const IconWrap = styled.div`
  display: flex;
  float: right;
  margin-left: auto;
`;
