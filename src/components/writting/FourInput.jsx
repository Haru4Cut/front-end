import React, { useState } from "react";
import styled from "styled-components";

const FourInput = ({
  cut,
  currentCutIdx,
  handleInputChange,
  handleEmotionChange,
}) => {
  //const currentCut = useSelector((state) => state.cutInput.cuts[currentCutIdx]);

  // currentCut에서 각 키워드의 값을 가져옴
  //const { other, place, action, emotion } = currentCut;

  const [focusedInput, setFocusedInput] = useState(null);
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const handleInputBlur = () => {
    setFocusedInput(null);
  };
  return (
    <>
      <CenterColWrap>
        <InputWrap>
          <CutInfoText>{`${currentCutIdx + 1} cut`}</CutInfoText>
          <InputGroup>
            <CategoryTitle>누구랑?</CategoryTitle>
            <StyledInput
              value={cut ? cut.other : ""}
              onChange={(e) => {
                handleInputChange(currentCutIdx, "other", e.target.value);
              }}
              onFocus={() => {
                handleInputFocus("other");
              }}
              onBlur={handleInputBlur}
              isFocused={focusedInput === "other"}
              placeholder="  ex) 동기랑"
            />
          </InputGroup>
          <InputGroup>
            <CategoryTitle>어디에서?</CategoryTitle>
            <StyledInput
              value={cut ? cut.place : ""}
              onChange={(e) => {
                handleInputChange(currentCutIdx, "place", e.target.value);
              }}
              onFocus={() => {
                handleInputFocus("place");
              }}
              onBlur={handleInputBlur}
              isFocused={focusedInput === "place"}
              placeholder="  ex) 도서관에서"
            />
          </InputGroup>
          <InputGroup>
            <CategoryTitle>무엇을?</CategoryTitle>
            <StyledInput
              value={cut ? cut.action : ""}
              onChange={(e) => {
                handleInputChange(currentCutIdx, "action", e.target.value);
              }}
              onFocus={() => {
                handleInputFocus("action");
              }}
              onBlur={handleInputBlur}
              isFocused={focusedInput === "action"}
              placeholder="   ex) 공부를"
            />
          </InputGroup>
          <InputGroup>
            <CategoryTitle>그 때의 감정은?</CategoryTitle>
            <StyledSelect
              value={cut ? cut.emotion : 1}
              onChange={(e) =>
                handleEmotionChange(e.target.value, currentCutIdx)
              }
              onFocus={() => {
                handleInputFocus("emotion");
              }}
              onBlur={handleInputBlur}
              isFocused={focusedInput === "emotion"}
              placeholder="감정을 선택하세요"
            >
              <option value={1} label="기쁨">
                기쁨
              </option>
              <option value={2} label="슬픔">
                슬픔
              </option>
              <option value={3} label="분노">
                분노
              </option>
              <option value={4} label="쏘쏘">
                쏘쏘
              </option>
            </StyledSelect>
          </InputGroup>
        </InputWrap>
      </CenterColWrap>
    </>
  );
};

export default FourInput;
const CenterColWrap = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  //background-color: green;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  //align-items: flex-end; /* 오른쪽 정렬을 위해 수정 */
  // background-color: blue;
`;
const InputGroup = styled.div`
  width: 50vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 3vh;
  // margin-right: 5vw;
  //align-items: flex-end; /* 오른쪽 정렬을 위해 수정 */
`;
const CategoryTitle = styled.div`
  margin-bottom: 10px;
  width: 60%;
`;
const StyledInput = styled.input`
  border-radius: 5px;
  border: ${({ isFocused }) =>
    isFocused ? "2px solid blue" : "1px solid gray"};
  width: 60%;
  height: 5vh;
`;

const StyledSelect = styled.select`
  border-radius: 5px;
  border: ${({ isFocused }) =>
    isFocused ? "2px solid blue" : "1px solid gray"};
  width: 60%;
  //height: 50%; /* Input 스타일과 동일하게 변경 */
  height: 5vh;
`;
const CutInfoText = styled.div`
  font-size: 2rem;
  font-weight: bold;

  font-family: "KotraHope";
`;
