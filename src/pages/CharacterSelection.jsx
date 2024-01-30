import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import CharacterSelectionText from "../components/CharacterSelectionText";
import GenderSelection from "../components/GenderSelection";
import AgeSelection from "../components/AgeSelection";
import HairSelection from "../components/HairSelection";
import SkinSelection from "../components/SkinSelection";
import EtcSelection from "../components/EtcSelection";
import SubmitButton from "../components/SubmitButton";
import HairColor from "../components/HairColor";
import HairStyle from "../components/HairStyle";

export default function CharacterSelection() {
  const [selectionStep, setselectionStep] = useState(1);
  const PageNum = 4;
  const handleNextStep = () => {
    if (selectionStep < PageNum) {
      setselectionStep(selectionStep + 1);
    }
  };

  const CircleNum = ({ selectionStep, PageNum }) => (
    <CircleWrap>
      {Array(PageNum)
        .fill(null)
        .map((_, index) => (
          <Circle key={index + 1} isSelected={index + 1 === selectionStep} />
        ))}
    </CircleWrap>
  );

  // 현재 선택 단계
  let currentStep;
  if (selectionStep === 1) {
    currentStep = (
      <SelectionBox>
        <GenderSelection />
        <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
      </SelectionBox>
    ); // 1이면 성별 선택
  } else if (selectionStep === 2) {
    currentStep = (
      <SelectionBox>
        <AgeSelection />
        <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
      </SelectionBox>
    ); // 2이면 나이 선택
  } else if (selectionStep === 3) {
    currentStep = (
      <>
        <SelectionBox
          padding="10px 30px 0px 30px"
          marginBottom="0px"
          height="275px"
        >
          <HairStyle />
        </SelectionBox>
        <SelectionBox
          height="110px"
          marginTop="11px"
          marginBottom="35px"
          padding="10px 30px 10px 30px"
        >
          <HairColor />
          <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
        </SelectionBox>
      </>
    ); // 3이면 머리스타일 선택
  } else if (selectionStep === 4) {
    currentStep = (
      <>
        <SelectionBox padding="20px 30px" marginBottom="0px" height="110px">
          <SkinSelection />
        </SelectionBox>
        <SelectionBox
          height="275px"
          marginTop="11px"
          marginBottom="35px"
          padding="20px 30px"
        >
          <EtcSelection />
          <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
        </SelectionBox>
      </>
    ); // 4이면 피부색 선택, 기타
  }

  return (
    <CharacterSelectionWrap>
      <CharacterSelectionText />
      {currentStep}

      {selectionStep < PageNum ? (
        <Button onClick={handleNextStep}>다음</Button>
      ) : (
        selectionStep === PageNum && <SubmitButton />
      )}
    </CharacterSelectionWrap>
  );
}

const CharacterSelectionWrap = styled.div`
  background-color: #f3f5f6;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SelectionBox = styled.div`
  width: 230px;
  height: ${(props) => props.height || "310px"};
  background-color: white;
  border-radius: 50px;
  margin-top: ${(props) => props.marginTop || "36px"};
  margin-bottom: ${(props) => props.marginBottom || "100px"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.padding || "50px 30px 10px 30px"};
`;

const CircleWrap = styled.div`
  display: flex;
  margin-top: auto;
`;

const Circle = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? "#555555" : "#D9D9D9")};
  margin: 0 2px;
`;
