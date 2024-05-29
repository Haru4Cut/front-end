import React, { useState, useEffect } from "react";
import styled from "styled-components";
import diaryImg from "../../assets/images/diaryImg.svg";
import { Link } from "react-router-dom";
import Payment from "../common/Payment";
export default function NoneDiary() {
  // 모달창 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <NoneDiaryWrap>
      <DiaryImg src={diaryImg} />
      <ContentText>
        네컷일기가 존재하지 않습니다! {"\n"}오늘의 일기를 네컷으로 기록해보세요
        :)
      </ContentText>
      {/*<DiaryButton to="/writting/frame">일기 만들러 가기</DiaryButton>*/}
      <DiaryButton onClick={openModal}>일기 만들러 가기</DiaryButton>
      <Payment
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </NoneDiaryWrap>
  );
}

const NoneDiaryWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DiaryImg = styled.img`
  width: 150px;
  margin-top: 28px;
`;

const ContentText = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
  margin: 18px 0px 28px 0px;
`;

const DiaryButton = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  background-color: #5370d4;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 11px 69px;
  cursor: pointer;
  font-family: Pretendard;
`;
