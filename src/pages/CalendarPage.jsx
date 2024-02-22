import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import Calendar from "react-calendar";
import "./calendarStyles.css";
import moment from "moment";
export default function CalendarPage() {
  return (
    <CalendarWrap>
      <Header>
        <BackButton />
        <MyPageText>캘린더</MyPageText>
      </Header>
      <CalendarBox>
        <Calendar formatDay={(locale, date) => moment(date).format("D")} />
      </CalendarBox>
    </CalendarWrap>
  );
}

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;
const Header = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  position: relative;
  font-family: "KotraHope";
  font-size: 24px;
  text-align: center;
`;

const MyPageText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CalendarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
