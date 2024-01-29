import React from "react";
import styled from "styled-components";
import Man from "../assets/images/ManCharacter.png";
import Woman from "../assets/images/WomanCharacter.png";
import CharacterAlert from "./CharacterAlert";
export default function GenderSelection() {
  return (
    <>
      <TitleText>성별은 무엇인가요?</TitleText>
      <CharacterWrap>
        <WomanWrap>
          <img src={Woman} />
          <ContentText>여자</ContentText>
        </WomanWrap>
        <ManWrap>
          <img src={Man} />
          <ContentText marginTop="8px">남자</ContentText>
        </ManWrap>
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
  margin-top: ${(props) => props.marginTop || "12px"};
  color: #272727;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
`;

const CharacterWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const WomanWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ManWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4px;
`;
