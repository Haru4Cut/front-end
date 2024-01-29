import React from "react";
import styled from "styled-components";

export default function AgeSelection() {
  const Age = ["10대", "2-30대", "4-50대", "60대 이상"];
  const AgeList = Age.map((age, index) => (
    <AgeCircle key={index}>{age}</AgeCircle>
  ));
  return (
    <>
      <TitleText>몇 살인가요?</TitleText>
      <CircleWrap>{AgeList}</CircleWrap>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;

const CircleWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 25px;
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AgeCircle = styled.div`
  background-color: #f0f0f0;
  border-radius: 50%;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
  width: 77px;
  height: 77px;
  color: #1f1f1f;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
`;
