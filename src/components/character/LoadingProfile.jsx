import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../../assets/images/LoadingSpinner.gif";
import SquareLogo from "../../assets/images/haru4cutSquareLogo.png";

export default function CharacterLoading() {
  return (
    <LoadingWrap>
      <MainText>프로필 사진을 생성 중이에요!</MainText>
      <SubText>열심히 만드는 중이니 잠시만 기다려 주세요 :)</SubText>
      <Logo src={SquareLogo} alt="SquareLogo"></Logo>
      <Spinner src={LoadingSpinner} alt="Loading"></Spinner>
    </LoadingWrap>
  );
}

const MainText = styled.div`
  color: #222222;
  font-size: 22px;
  font-weight: 700;
`;

const SubText = styled.div`
  color: #4b4b4b;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 60px;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 120px;
`;
const Spinner = styled.img`
  margin-top: 50px;
  margin-bottom: 120px;
  width: 60px;
`;
