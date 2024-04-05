import React, { useState } from "react";
import styled from "styled-components";

export default function EtcSelection({ setEtcText, etcText }) {
  const [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setEtcText(e.target.value);
    setInputCount(e.target.value.length);
  };
  return (
    <>
      <TitleText>기타 정보를 알려주세요!</TitleText>
      <ExampleText>
        ex 안경, 교복 등 특징을 짧게 적어주세요{"\n"} 기타 특징은 반영이 안될
        수도 있어요!
      </ExampleText>
      <StyledTextArea onChange={onInputHandler} maxLength={29}></StyledTextArea>
      <CountText>{inputCount}/30</CountText>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 18px;
`;

const ExampleText = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  white-space: pre-wrap;
`;

const StyledTextArea = styled.textarea`
  width: 160px;
  height: 100px;
  margin-top: 15px;
  resize: none;
  font-family: "Pretendard";
  border: 1px solid #dbdbdb;
  border-radius: 10%;
  outline: none;
  color: #585858;
  font-size: 16px;
  padding: 12px 20px;
  line-height: 25px;
`;

const CountText = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 400;
  width: 200px;
  text-align: right;
  margin: 7px 15px 0px 0px;
`;
