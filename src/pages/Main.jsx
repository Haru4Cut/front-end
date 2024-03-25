import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import TodaysDiary from "../components/main/TodaysDiary";
import MemoryDiary from "../components/main/MemoryDiary";
export default function Main() {
  return (
    <MainWrap>
      <Header />
      {/*오늘의 네컷일기*/}
      <TodaysDiaryWrap>
        <TodaysDiary></TodaysDiary>
      </TodaysDiaryWrap>
      {/*추억일기*/}
      <MemoryDiaryWrap>
        <MemoryDiary></MemoryDiary>
      </MemoryDiaryWrap>
    </MainWrap>
  );
}
const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f6f3f4;
`;

const TodaysDiaryWrap = styled.div`
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
const MemoryDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 38%;
  margin-top: 12px;
  margin-bottom: 20px;
`;
