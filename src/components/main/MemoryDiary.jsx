import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemoryDiaryImg from "../../assets/images/MemoryDiaryImg.png";
export default function MemoryDiary() {
  const memoryDate = "23.10.12";
  return (
    <MemoryDiaryWrap>
      <MemoryDiaryText>추억일기</MemoryDiaryText>
      <ContentText>
        그동안의 네컷일기 속에 담긴 {"\n"}
        추억을 감상하세요
      </ContentText>
      <MemoryImg src={MemoryDiaryImg} />
      <Date>{memoryDate}</Date>
    </MemoryDiaryWrap>
  );
}

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
const MemoryDiaryText = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
`;
const ContentText = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
  margin: 5px 0px 14px 0px;
`;
const MemoryImg = styled.img`
  width: 165px;
`;
const Date = styled.div`
  align-items: center;
  text-align: center;
  color: #5b8fbe;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: 25%;
`;
