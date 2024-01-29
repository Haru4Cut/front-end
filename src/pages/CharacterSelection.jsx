import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import CharacterSelectionText from "../components/CharacterSelectionText";
import GenderSelection from "../components/GenderSelection";
export default function CharacterSelection() {
  return (
    <CharacterSelectionWrap>
      <CharacterSelectionText />
      <SelectionBox>
        <GenderSelection />
      </SelectionBox>
      <Button>다음</Button>
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
