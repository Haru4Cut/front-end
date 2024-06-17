import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarIcon from "../../assets/images/calendarIller.svg";
import Button from "../common/Button";
import axiosInstance from "../../api/axiosInstance";
// 사진 넘어가는 시간 5초
const INTERVAL_TIME = 5000;

export default function MemoryDiary() {
  const [nickName, setNickName] = useState("");
  const [memoryDiary, setMemoryDiary] = useState({ imgLinks: [], date: [] });
  const [currentSlide, setCurrentSlide] = useState(0);

  const userId = localStorage.getItem("userId");

  // 닉네임
  useEffect(() => {
    const fetchNickName = async () => {
      try {
        const response = await axiosInstance.get(`/character/${userId}`);
        setNickName(response.data.nickname);
        console.log(response.data.nickname);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNickName();
  }, [userId]);

  // 추억일기 (좋아요 누른 일기 전체 조회 API)
  useEffect(() => {
    const fetchMemoryDiaries = async () => {
      try {
        const response = await axiosInstance.get(`/likes/${userId}`);
        setMemoryDiary(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemoryDiaries();
  }, [userId]);

  useEffect(() => {
    if (memoryDiary.imgLinks.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % memoryDiary.imgLinks.length
        );
      }, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, [memoryDiary]);

  return (
    <>
      <MemoryDiaryText>
        <NickNameText>{nickName}</NickNameText>님의 추억일기
      </MemoryDiaryText>

      <div>
        {memoryDiary.imgLinks.length > 0 ? (
          <>
            <ContentText>
              그동안의 네컷일기 속에 담긴 {"\n"}
              추억을 감상하세요
            </ContentText>
            <MemoryImg src={memoryDiary.imgLinks[currentSlide]} />
            <Date>{memoryDiary.date[currentSlide]}</Date>
          </>
        ) : (
          <CalendarWrap>
            <Calendar src={CalendarIcon} alt="달력 아이콘" />
            <ContentText fontSize="14px">
              추억일기가 존재하지 않아요 :( {"\n"}하트를 누르면 추억일기에 담을
              수 있어요!
            </ContentText>
            <Button
              backgroundColor="#8A8A8A"
              width="229px"
              height="38px"
              to="/calendar"
            >
              내가 쓴 일기 보러가기
            </Button>
          </CalendarWrap>
        )}
      </div>
    </>
  );
}

const MemoryDiaryText = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
  display: flex;
`;
const ContentText = styled.div`
  color: #5e5e5e;
  text-align: center;
  font-weight: 400;
  line-height: 20px;
  white-space: pre-wrap;
  margin: 5px 0px 14px 0px;
  font-size: ${(props) => props.fontSize || "13px"};
`;
const NickNameText = styled.div`
  font-size: 26px;
  color: #5370d4;
  margin-right: 3px;
`;
const MemoryImg = styled.img`
  width: 165px;
`;
const Date = styled.div`
  align-items: flex-end;
  text-align: right;
  color: #5b8fbe;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
`;

const Calendar = styled.img`
  width: 80px;
  margin-top: 10px;
`;
const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
