import React from "react";
import styled from "styled-components";
import CharacterAlert from "./CharacterAlert";
import LongHair from "../assets/images/LongHair.svg";
import MidiumHair from "../assets/images/MidiumHair.svg";
import ShortHair from "../assets/images/ShortHair.svg";

export default function HairStyle() {
  return (
    <>
      <TitleText>머리스타일을 골라주세요!</TitleText>
      <CharacterWrap>
        <CharacterBox>
          <img src={ShortHair} />
          <CharacterText>숏컷</CharacterText>
        </CharacterBox>
        <CharacterBox>
          <img src={MidiumHair} />
          <CharacterText>단발</CharacterText>
        </CharacterBox>
        <CharacterBox>
          <img src={LongHair} />
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
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin-top: 13px;
`;
const CharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 30px 0px;
`;
