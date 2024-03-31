import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import CompleteIcon from "../../assets/images/CompleteIcon.svg";
import RefreshIcon from "../../assets/images/RefreshIcon.svg";
import { useSelector } from "react-redux";

export default function CompleteProfile({ imageUrl, onRefresh }) {
  const nickName = useSelector((state) => state.nickName);
  return (
    <CompleteWrap>
      <MainText>프로필 사진</MainText>
      <SubText>
        캐릭터 정보를 반영해 사진을 만들었어요! {"\n"} 하루네컷 서비스에서
        이용될 프로필 사진이에요 :)
      </SubText>
      <ProfileBox>
        <ProfileImage src={imageUrl} alt="ProfileImage"></ProfileImage>
      </ProfileBox>
      <Button backgroundColor="#9D9D9D" marginBottom="8px" onClick={onRefresh}>
        <Icon src={RefreshIcon} />
        <ButtonText>다시 만들기</ButtonText>
      </Button>
      <Button>
        <Icon src={CompleteIcon} />
        <ButtonText>캐릭터 완성</ButtonText>
      </Button>
    </CompleteWrap>
  );
}

const CompleteWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MainText = styled.div`
  color: #222222;
  font-size: 22px;
  font-weight: 700;
`;

const SubText = styled.div`
  color: #4b4b4b;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 30px;
  white-space: pre-wrap;
  text-align: center;
  line-height: 140%;
`;

const ProfileBox = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 90px;
`;

const Icon = styled.img`
  margin-right: 10px;
`;
const ButtonText = styled.div`
  margin-right: 10px;
`;

const ProfileImage = styled.img`
  width: 210px;
  height: 210px;
`;
