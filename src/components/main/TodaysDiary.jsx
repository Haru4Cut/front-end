import React, { useState, useEffect } from "react";
import styled from "styled-components";
import diaryImg from "../../assets/images/diaryImg.svg";
import NoneDiary from "./NoneDiary";
export default function TodaysDiary() {
  //오늘 날짜
  function getToday() {
    var date = new Date();
    var year = date.getFullYear().toString().slice(-2);

    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "." + month + "." + day;
  }
  return (
    <TodayDiaryWrap>
      <TodayDate>{getToday()}</TodayDate>
      <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
      <NoneDiary />
    </TodayDiaryWrap>
  );
}

const TodayDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 50%;
`;
const TodayDate = styled.div`
  align-items: center;
  text-align: center;
  color: #5b8fbe;
  font-weight: 600;
  font-size: 16px;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
`;
