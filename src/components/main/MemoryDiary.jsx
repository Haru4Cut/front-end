import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarIcon from "../../assets/images/calendarIller.svg";
import Button from "../common/Button";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";

// 사진 넘어가는 시간 5초
const INTERVAL_TIME = 5000;

export default function MemoryDiary() {
  const [nickName, setNickName] = useState("");
  const [memoryDiary, setMemoryDiary] = useState({ imgLinks: [], date: [] });
  const [memoryDiaryId, setMemoryDiaryId] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const userId = localStorage.getItem("userId");

  // 닉네임
  useEffect(() => {
    const fetchNickName = async () => {
      try {
        const response = await axiosInstance.get(`/character/${userId}`);
        setNickName(response.data.nickName);
        console.log(response.data.nickName);
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
        const response = await axiosInstance.get(`/likes/users/${userId}`);
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
        setIsFadingOut(true); // 페이드아웃 시작
        setTimeout(() => {
          setCurrentSlide(
            (prevSlide) => (prevSlide + 1) % memoryDiary.imgLinks.length
          );
          setIsFadingOut(false); // 페이드인 시작
        }, 500); // 500ms 후에 페이드인으로 변경
      }, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, [memoryDiary]);

  useEffect(() => {
    if (memoryDiary.date.length > 0) {
      fetchDataForDates(memoryDiary.date);
    }
  }, [memoryDiary.date]);

  // 추억일기 날짜의 diaryid 얻기
  const fetchDataForDates = async (dates) => {
    try {
      const requests = dates.map((date) =>
        axiosInstance.get(`/users/${userId}/diarybydate`, { params: { date } })
      );
      const responses = await Promise.all(requests);
      const data = responses.map((response) => response.data);
      console.log("데이터", data);
      const diaryIds = data.map((diary) => diary.diaryId); // diaryId를 추출하여 배열로 저장
      setMemoryDiaryId(diaryIds);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MemoryDiaryText>
        <NickNameText>{nickName}</NickNameText>님의 추억일기
      </MemoryDiaryText>

      <div>
        {memoryDiary.imgLinks.length > 0 ? (
          <MemoryWrap>
            <ContentText>
              그동안의 네컷일기 속에 담긴 {"\n"}
              추억을 감상하세요
            </ContentText>
            <MemoryDateWrap to={`/haru4cut/${memoryDiaryId[currentSlide]}`}>
              <MemoryImg
                src={memoryDiary.imgLinks[currentSlide]}
                className={isFadingOut ? "fadeOut" : "fadeIn"} // 페이드아웃/페이드인 클래스 추가/제거
              />
              <Date>{memoryDiary.date[currentSlide]}</Date>
            </MemoryDateWrap>
          </MemoryWrap>
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
const MemoryWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MemoryDateWrap = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;
const MemoryImg = styled.img`
  height: 150px;
  &.fadeOut {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  &.fadeIn {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
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
