import React from "react";
import styled from "styled-components";

export default function SkinSelection({ setSelectedSkin, selectedSkin }) {
  const handleClickSkin = (index) => {
    setSelectedSkin(index);
  };
  return (
    <>
      <TitleText>피부색은 어떤가요?</TitleText>
      <CircleWrap>
        <Circle
          onClick={() => {
            handleClickSkin(0);
          }}
        >
          {selectedSkin === 0 && <ClickedWrap />}
        </Circle>
        <Circle
          backgroundColor="#F3DB9E"
          onClick={() => {
            handleClickSkin(1);
          }}
        >
          {selectedSkin === 1 && <ClickedWrap />}
        </Circle>
        <Circle
          backgroundColor="#3E2809"
          onClick={() => {
            handleClickSkin(2);
          }}
        >
          {selectedSkin === 2 && <ClickedWrap />}
        </Circle>
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
  align-items: center;
  justify-content: center;
`;
const Circle = styled.div`
  z-index: 100;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor || "#FAF4EC"};
  width: 45px;
  height: 45px;
  margin: 0px 8px;
`;

const ClickedWrap = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  border: 2px solid #5370d4;
  border-radius: 10px;
  background: rgba(83, 112, 212, 0.1);
  filter: blur(1px);
  margin-left: -7px;
  margin-top: -7px;
`;
