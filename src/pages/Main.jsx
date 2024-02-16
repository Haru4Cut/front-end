import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TodaysDiary from "../components/main/TodaysDiary";
import MemoryDiary from "../components/main/MemoryDiary";
export default function Main() {
  return (
    <MainWrap>
      <Header />
      <TodaysDiary></TodaysDiary>
      <MemoryDiary></MemoryDiary>
    </MainWrap>
  );
}
const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;
