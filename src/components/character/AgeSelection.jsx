import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
export default function AgeSelection({ setSelectedAge, selectedAge }) {
  const Age = ["10대", "2-30대", "4-50대", "60대 이상"];
  const characterMode = useSelector((state) => state.characterMode);
  const handleClickAge = (index) => {
    setSelectedAge(index + 1);
  };
  const AgeList = Age.map((age, index) => (
    <AgeCircle
      key={index + 1}
      onClick={() => handleClickAge(index)}
      isSelected={selectedAge === index + 1}
    >
      {age}
    </AgeCircle>
  ));
  return (
    <>
      <TitleText>몇 살인가요?</TitleText>
      <CircleWrap>{AgeList}</CircleWrap>
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

const CircleWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 25px;
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AgeCircle = styled.div`
  background-color: #f0f0f0;
  border-radius: 50%;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
  width: 77px;
  height: 77px;
  color: #1f1f1f;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: #5370d4;
      color: white;
      font-weight: 400;
    `}
  &:hover {
    background-color: #5370d4;
    color: white;
    font-weight: 400;
  }
`;
