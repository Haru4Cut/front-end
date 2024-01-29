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
export default function CharacterSelection() {
  const [selectionStep, setselectionStep] = useState(1);
  const PageNum = 4;
  const handleNextStep = () => {
    if (selectionStep < PageNum) {
      setselectionStep(selectionStep + 1);
    }
  };

  // 현재 선택 단계
  let currentStep;
  if (selectionStep === 1) {
    currentStep = (
      <SelectionBox>
        <GenderSelection />
      </SelectionBox>
    ); // 1이면 성별 선택
  } else if (selectionStep === 2) {
    currentStep = (
      <SelectionBox>
        <AgeSelection />
      </SelectionBox>
    ); // 2이면 나이 선택
  } else if (selectionStep === 3) {
    currentStep = <HairSelection />; // 3이면 머리스타일 선택
  } else if (selectionStep === 4) {
    currentStep = (
      <SelectionBox>
        <SkinSelection />
      </SelectionBox>
    ); // 4이면 피부색 선택, 기타
  }

  return (
    <CharacterSelectionWrap>
      <CharacterSelectionText />
      {currentStep}
      <CircleWrap>
        {Array(PageNum)
          .fill(null)
          .map((_, index) => (
            <Circle key={index + 1} isSelected={index + 1 === selectionStep} />
          ))}
      </CircleWrap>
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
  width: 280px;
  height: 360px;
  background-color: white;
  border-radius: 50px;
  margin: 36px 0px 100px 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CircleWrap = styled.div`
  display: flex;
`;

const Circle = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? "#555555" : "#D9D9D9")};
  margin: 0 2px;
`;
