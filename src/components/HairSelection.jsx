import React from "react";
import styled from "styled-components";
import CharacterAlert from "./CharacterAlert";
import LongHair from "../assets/images/LongHair.svg";
import MidiumHair from "../assets/images/MidiumHair.svg";
import ShortHair from "../assets/images/ShortHair.svg";

export default function HairSelection() {
  return (
    <>
      <SelectionBox marginBottom="0px">
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
      </SelectionBox>
      <SelectionBox height="140px" marginTop="11px">
        <TitleText>머리색을 골라주세요!</TitleText>
        <HairColorWrap>
          <HairColorCircle></HairColorCircle>
          <HairColorCircle backgroundColor="#745629"></HairColorCircle>
          <HairColorCircle backgroundColor="#B40000"></HairColorCircle>
          <HairColorCircle backgroundColor="#F0C734"></HairColorCircle>
        </HairColorWrap>
      </SelectionBox>
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
const SelectionBox = styled.div`
  width: 280px;
  height: ${(props) => props.height || "275px"};
  background-color: white;
  border-radius: 50px;
  margin-top: ${(props) => props.marginTop || "36px"};
  margin-bottom: ${(props) => props.marginBottom || "38px"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
