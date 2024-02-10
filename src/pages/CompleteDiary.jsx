import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";

export default function CompeleteDiary() {
  return (
    <CompeleteDiaryWrap>
      <div>
        <Haru4CutText>Haru 4cut</Haru4CutText>
        <Haru4CutLine></Haru4CutLine>
      </div>
      <SubText>내 하루를 네컷으로 기록하세요</SubText>
    </CompeleteDiaryWrap>
  );
}

const CompeleteDiaryWrap = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Haru4CutLine = styled.div`
  position: relative;
  margin-top: -12px;
  border-radius: 30px;
  background: #daebfa;
  width: 210px;
  height: 10px;
  z-index: -1;
`;
const Haru4CutText = styled.div`
  font-family: "PoetsenOne";
  color: #9cbedd;
  text-align: center;
  font-size: 42px;
  font-weight: 400;
  z-index: 3;
  letter-spacing: -0.84px;
`;
const SubText = styled.div`
  margin-top: 5pxg;
  font-family: "KotraHope";
  color: #9cbedd;
  text-align: center;
  font-family: "KOTRA HOPE";
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.6px;
`;
