import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
export default function Main() {
  return (
    <MainWrap>
      <Header />
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
