import React from "react";
import styled from "styled-components";

export default function CharacterSelectionText() {
  return (
    <>
      <TitleText>내 캐릭터를 설정하세요</TitleText>
      <Contentext>
        지금 입력한 정보로 일기의 주인공 모습이 생성돼요 {"\n"}내 모습을
        입력하거나, 가상의 캐릭터를 만들어보세요!
      </Contentext>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;

const Contentext = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
`;
