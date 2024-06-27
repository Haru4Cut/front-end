import React, { useState, useEffect } from "react";
import styled from "styled-components";
import diaryImg from "../../assets/images/diaryImg.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // axiosInstance 경로가 맞는지 확인하세요
import Payment from "../common/Payment";

export default function NoneDiary() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pencil, setPencil] = useState(0); // 연필 개수 state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // 모달창 열기 함수
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달창 닫기 함수
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 연필 개수 가져오기
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axiosInstance.get(`/character/${userId}`);
        console.log(response.data);
        setPencil(response.data.pencils); // 펜슬 정보 state에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, []);

  // 버튼 클릭 시 실행되는 함수
  const handleButtonClick = () => {
    if (pencil <= 0) {
      openModal();
    } else {
      navigate("/writting/frame");
    }
  };

  return (
    <NoneDiaryWrap>
      <DiaryImg src={diaryImg} />
      <ContentText>
        네컷일기가 존재하지 않습니다! {"\n"}오늘의 일기를 네컷으로 기록해보세요
        :)
      </ContentText>
      <DiaryButton as="button" onClick={handleButtonClick}>
        일기 만들러 가기
      </DiaryButton>
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
  margin: 10px 0px 15px 0px;
`;

const DiaryButton = styled.button`
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
