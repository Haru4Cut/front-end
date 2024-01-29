import React, { useState, useEffect } from "react";
import CharacterIcon from "../assets/images/CharacterIcon.svg";
import styled from "styled-components";
import Button from "../components/Button";
import CharacterSelectionText from "../components/CharacterSelectionText";

export default function Character() {
  return (
    <CharacterWrap>
      <CharacterBox>
        <img src={CharacterIcon} />
        <CharacterSelectionText />
      </CharacterBox>
      <Button to="/character/selection">시작하기</Button>
    </CharacterWrap>
  );
}
const CharacterWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const CharacterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 280px;
`;
