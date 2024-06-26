import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import CompleteIcon from "../../assets/images/CompleteIcon.svg";
import RefreshIcon from "../../assets/images/RefreshIcon.svg";
import EditIcon from "../../assets/images/Edit_light.png";
import PencilInfo from "../common/PencilInfo";

export default function CompleteProfile({ imageUrl, onRefresh, onComplete }) {
  const [isHovered, setIsHovered] = useState(false);
  const [pencilPosition, setPencilPosition] = useState({ top: 0, left: 0 });
  const pencilRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (pencilRef.current) {
      const rect = pencilRef.current.getBoundingClientRect();
      setPencilPosition({ top: rect.top, left: rect.left });
    }
  }, [pencilRef.current]);

  return (
    <CompleteWrap>
      <MainText>프로필 사진</MainText>
      <SubText>
        캐릭터 정보를 반영해 사진을 만들었어요! {"\n"} 하루네컷 서비스에서
        이용될 프로필 사진이에요 :)
      </SubText>
      <ProfileBox>
        {imageUrl ? (
          <ProfileImage src={imageUrl} alt="ProfileImage" />
        ) : (
          // imageUrl이 없을 때
          <ErrorText>
            이미지가 정상적으로 만들어지지 않았어요. {"\n"}새로고침 또는 하단
            "다시 만들기" 버튼을 {"\n"}클릭해주세요 :(
          </ErrorText>
        )}
      </ProfileBox>
      <PencilInfo
        isHovered={isHovered}
        title="프로필 다시 만들기에는 <b>1연필</b>이 소모돼요!"
        text="<div>하루네컷에서 사용되는 포인트로,</div> 마이페이지에서 결제가
        가능해요 :)"
        position={{ top: pencilPosition.top - 140, left: pencilPosition.left - 140 }}
      />
      <Button
        backgroundColor="#9D9D9D"
        marginTop="80px"
        marginBottom="8px"
        onClick={onRefresh}
      >
        <AgainIcon src={RefreshIcon} />
        <ButtonText>다시 만들기</ButtonText>
        <PencilWrap
          ref={pencilRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={EditIcon} alt="연필" />1
        </PencilWrap>
      </Button>
      <Button onClick={onComplete}>
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
  height: 100vh;
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
  margin-bottom: 40px;
  white-space: pre-wrap;
  text-align: center;
  line-height: 140%;
`;

const ErrorText = styled.div`
  color: #4b4b4b;
  width: 240px;
  font-size: 14px;
  margin: 20px 0px;
  white-space: pre-wrap;
  text-align: center;
  line-height: 140%;
`;

const ProfileBox = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 320px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const AgainIcon = styled.img`
margin-left: 40px;
`;

const ButtonText = styled.div`
  margin-right: 10px;
  margin-left: 5px;
`;

const PencilWrap = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5a5a5a;
  border-radius: 50px;
  padding: 2px 13px 2px 8px;
  position: relative;
  cursor: pointer;
  z-index: 999;
  white-space: pre-wrap;
`;

const ProfileImage = styled.img`
  width: 210px;
`;
