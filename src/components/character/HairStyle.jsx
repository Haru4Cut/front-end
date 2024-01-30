import React from "react";
import styled from "styled-components";
import CharacterAlert from "./CharacterAlert";
import LongHair from "../../assets/images/LongHair.svg";
import MidiumHair from "../../assets/images/MidiumHair.svg";
import ShortHair from "../../assets/images/ShortHair.svg";

export default function HairStyle({ setSelectedHairStyle, selectedHairStyle }) {
  const handleClickHairStyle = (index) => {
    setSelectedHairStyle(index);
  };

  return (
    <>
      <TitleText>머리스타일을 골라주세요!</TitleText>
      <CharacterWrap>
        <CharacterBox
          onClick={() => {
            handleClickHairStyle(0);
          }}
        >
          {selectedHairStyle === 0 && <ClickedWrap />}
          <CharacterImg src={ShortHair} />
          <CharacterText>숏컷</CharacterText>
        </CharacterBox>
        <CharacterBox onClick={() => handleClickHairStyle(1)}>
          {selectedHairStyle === 1 && <ClickedWrap />}
          <CharacterImg src={MidiumHair} />
          <CharacterText>단발</CharacterText>
        </CharacterBox>
        <CharacterBox onClick={() => handleClickHairStyle(2)}>
          {selectedHairStyle === 2 && <ClickedWrap />}
          <CharacterImg src={LongHair} />
          <CharacterText>장발</CharacterText>
        </CharacterBox>
      </CharacterWrap>
      <CharacterAlert></CharacterAlert>
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
const CharacterWrap = styled.div`
  display: flex;
`;
const CharacterText = styled.div`
  color: #555555;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
`;
const CharacterImg = styled.img`
  z-index: 2;
`;
const CharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 3px 30px 0px;
  cursor: pointer;
`;
const ClickedWrap = styled.div`
  position: absolute;
  width: 66px;
  height: 115px;
  border: 2px solid #5370d4;
  border-radius: 10px;
  background: rgba(83, 112, 212, 0.1);
  filter: blur(1px);
`;
