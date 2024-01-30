import React from "react";
import styled from "styled-components";

export default function SkinSelection() {
  return (
    <>
      <TitleText>피부색은 어떤가요?</TitleText>
      <CircleWrap>
        <Circle></Circle>
        <Circle backgroundColor="#F3DB9E"></Circle>
        <Circle backgroundColor="#3E2809"></Circle>
      </CircleWrap>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;
const CircleWrap = styled.div`
  display: flex;
`;
const Circle = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor || "#FAF4EC"};
  width: 45px;
  height: 45px;
  margin: 0px 8px;
`;
