import React, { useState } from "react";
import styled from "styled-components";
import Man from "../../assets/images/ManCharacter.svg";
import Woman from "../../assets/images/WomanCharacter.svg";
import CharacterAlert from "./CharacterAlert";

export default function GenderSelection({ setSelectedGender, selectedGender }) {
  const handleClickGender = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <TitleText>성별은 무엇인가요?</TitleText>
      <CharacterWrap>
        {selectedGender === 0 && <ClickedWrap />}
        <GenderWrap onClick={() => handleClickGender(0)}>
          <CharacterImg src={Woman} />
          <ContentText>여자</ContentText>
        </GenderWrap>
        <GenderWrap onClick={() => handleClickGender(1)}>
          {selectedGender === 1 && <ClickedWrap />}
          <CharacterImg src={Man} />
          <ContentText>남자</ContentText>
        </GenderWrap>
      </CharacterWrap>
      <CharacterAlert />
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
const ContentText = styled.div`
  margin-top: 12px;
  color: #555555;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  z-index: 500;
`;

const CharacterWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const CharacterImg = styled.img`
  cursor: pointer;
  z-index: 2;
`;

const GenderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ClickedWrap = styled.div`
  position: absolute;
  width: 87px;
  height: 136px;
  border: 2px solid #5370d4;
  border-radius: 10px;
  background: rgba(83, 112, 212, 0.1);
  filter: blur(1px);
`;
