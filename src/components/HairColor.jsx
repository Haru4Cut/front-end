import React from "react";
import styled from "styled-components";

export default function HairColor() {
  return (
    <>
      <TitleText>머리색을 골라주세요!</TitleText>
      <HairColorWrap>
        <HairColorCircle></HairColorCircle>
        <HairColorCircle backgroundColor="#745629"></HairColorCircle>
        <HairColorCircle backgroundColor="#B40000"></HairColorCircle>
        <HairColorCircle backgroundColor="#F0C734"></HairColorCircle>
      </HairColorWrap>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 15px 0px 12px 0px;
`;

const HairColorWrap = styled.div`
  display: flex;
`;

const HairColorCircle = styled.div`
  background-color: ${(props) => props.backgroundColor || "black"};
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin: 0px 8px;
`;
