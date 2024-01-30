import React from "react";
import styled from "styled-components";

export default function HairColor({ setSelectedHairColor, selectedHairColor }) {
  const handleClickHairColor = (index) => {
    setSelectedHairColor(index);
  };
  return (
    <>
      <TitleText>머리색을 골라주세요!</TitleText>
      <HairColorWrap>
        <HairColorCircle
          onClick={() => {
            handleClickHairColor(0);
          }}
        >
          {selectedHairColor === 0 && <ClickedWrap />}
        </HairColorCircle>
        <HairColorCircle
          backgroundColor="#745629"
          onClick={() => {
            handleClickHairColor(1);
          }}
        >
          {selectedHairColor === 1 && <ClickedWrap />}
        </HairColorCircle>
        <HairColorCircle
          backgroundColor="#B40000"
          onClick={() => {
            handleClickHairColor(2);
          }}
        >
          {selectedHairColor === 2 && <ClickedWrap />}
        </HairColorCircle>
        <HairColorCircle
          backgroundColor="#F0C734"
          onClick={() => {
            handleClickHairColor(3);
          }}
        >
          {selectedHairColor === 3 && <ClickedWrap />}
        </HairColorCircle>
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
  align-items: center;
  justify-content: center;
`;

const HairColorCircle = styled.div`
  background-color: ${(props) => props.backgroundColor || "black"};
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin: 8px 8px 0px 10px;
  z-index: 2;
`;
const ClickedWrap = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  margin-left: -10px;
  margin-top: -10px;
  border: 2px solid #5370d4;
  border-radius: 10px;
  background: rgba(83, 112, 212, 0.1);
  filter: blur(1px);
`;
