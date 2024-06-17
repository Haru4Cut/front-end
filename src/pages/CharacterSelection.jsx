import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import CharacterSelectionText from "../components/character/CharacterSelectionText";
import GenderSelection from "../components/character/GenderSelection";
import AgeSelection from "../components/character/AgeSelection";
import SkinSelection from "../components/character/SkinSelection";
import EtcSelection from "../components/character/EtcSelection";
import SubmitButton from "../components/character/SubmitButton";
import HairColor from "../components/character/HairColor";
import HairStyle from "../components/character/HairStyle";
import { setNickName } from "../store";
import { useDispatch } from "react-redux";
import { setCharacterMode } from "../store";
import { useSelector } from "react-redux";
export default function CharacterSelection() {
  const [selectionStep, setselectionStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedHairStyle, setSelectedHairStyle] = useState(null);
  const [selectedHairColor, setSelectedHairColor] = useState(null);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [etcText, setEtcText] = useState("");

  const PageNum = 4; // 총 선택 페이지 개수 4개
  const dispatch = useDispatch();
  const location = useLocation();

  // 다음 페이지로 넘어가는 함수
  const handleNextStep = () => {
    if (selectionStep < PageNum) {
      setselectionStep(selectionStep + 1);
    }
  };

  // 하단 순서 바
  const CircleNum = ({ selectionStep, PageNum }) => (
    <CircleWrap>
      {Array(PageNum)
        .fill(null)
        .map((_, index) => (
          <Circle key={index + 1} isSelected={index + 1 === selectionStep} />
        ))}
    </CircleWrap>
  );

  let currentStep; // 현재 선택 단계
  if (selectionStep === 1) {
    currentStep = (
      <>
        <SelectionBox
          padding="0px 30px 0px 30px"
          marginBottom="0px"
          height="150px"
        >
          <TitleText>닉네임을 입력하세요</TitleText>
          <Alertext>5글자 이하로 입력해주세요 :)</Alertext>
          <NickNameInput
            maxLength={5}
            onChange={(e) => dispatch(setNickName(e.target.value))}
          ></NickNameInput>
        </SelectionBox>

        <SelectionBox marginTop="10px" height="280px">
          <GenderSelection
            setSelectedGender={setSelectedGender}
            selectedGender={selectedGender}
          />
          <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
        </SelectionBox>
      </>
    ); // 1이면 닉네임 및 성별 선택
  } else if (selectionStep === 2) {
    currentStep = (
      <SelectionBox>
        <AgeSelection
          setSelectedAge={setSelectedAge}
          selectedAge={selectedAge}
        />
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
          <HairStyle
            setSelectedHairStyle={setSelectedHairStyle}
            selectedHairStyle={selectedHairStyle}
          />
        </SelectionBox>
        <SelectionBox
          height="110px"
          marginTop="11px"
          marginBottom="35px"
          padding="10px 30px 10px 30px"
        >
          <HairColor
            setSelectedHairColor={setSelectedHairColor}
            selectedHairColor={selectedHairColor}
          />
          <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
        </SelectionBox>
      </>
    ); // 3이면 머리스타일 선택
  } else if (selectionStep === 4) {
    currentStep = (
      <>
        <SelectionBox padding="20px 30px" marginBottom="0px" height="110px">
          <SkinSelection
            setSelectedSkin={setSelectedSkin}
            selectedSkin={selectedSkin}
          />
        </SelectionBox>
        <SelectionBox
          height="275px"
          marginTop="11px"
          marginBottom="35px"
          padding="20px 30px"
        >
          <EtcSelection setEtcText={setEtcText} etcText={etcText} />
          <CircleNum selectionStep={selectionStep} PageNum={PageNum} />
        </SelectionBox>
      </>
    ); // 4이면 피부색 선택, 기타
  }

  const characterMode = useSelector((state) => state.characterMode);
  console.log("characterMode", characterMode);
  if (!characterMode) {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    console.log(mode);
    dispatch(setCharacterMode(mode));
  }

  return (
    <CharacterSelectionWrap>
      <CharacterSelectionText />
      {currentStep}

      {selectionStep < PageNum ? (
        <Button onClick={handleNextStep}>다음</Button>
      ) : (
        selectionStep === PageNum && (
          <SubmitButton
            selectedGender={selectedGender}
            selectedAge={selectedAge}
            selectedHairStyle={selectedHairStyle}
            selectedHairColor={selectedHairColor}
            selectedSkin={selectedSkin}
            etcText={etcText}
          />
        )
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
const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;

const NickNameInput = styled.input`
  margin-right: 10px;
  font-family: "KotraHope";
  width: 100px;
  font-size: 21px;
  color: #3a3a3a;
  text-align: center;
  border: none;
  padding-bottom: 5px;
  border-bottom: 2px solid #a5a5a5;
  outline: none;
`;
const Alertext = styled.div`
  color: #9c9c9c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
`;
