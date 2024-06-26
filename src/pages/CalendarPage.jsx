import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import Calendar from "react-calendar";
import "./calendarStyles.css";
import moment from "moment";
import Button from "../components/common/Button";
import axios from "axios";
import NoneDiary from "../components/main/NoneDiary";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryExistDate, setDiaryExistData] = useState();
  const [isheartToggle, SetIsheartToggle] = useState(true);
  const heartIconColor = isheartToggle ? "#E54B4B" : "#C7C7C7";
  const [diary, setDiary] = useState(); // 선택한 날짜의 diary
  const userId = localStorage.getItem("userId");
  // 선택된 날짜의 diary 가져오기
  useEffect(() => {
    const fetchDiaryDate = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/${userId}/diarybydate`,
          {
            params: {
              date: moment(selectedDate).format("YYYY-MM-DD"),
            },
          }
        );
        console.log("이 날짜의 다이어리", response.data);
        setDiary(response.data);
      } catch (error) {
        if (
          error.message === "Request failed with status code 500" ||
          "Request failed with status code 400"
        ) {
          setDiary(null); // 500 에러가 발생하면 일기가 없는 것으로 처리
        } else {
          console.error(error);
        }
      }
    };
    fetchDiaryDate();
  }, [selectedDate, userId]);

  const extractDates = (diaryData) => {
    if (!diaryData) return []; // 데이터 없을 때
    return diaryData.map((item) =>
      moment(item.date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  };

  const extractedDates = extractDates(diaryExistDate);

  // 전체 diary 가져오기
  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}/diaries`);
        console.log(response.data);
        setDiaryExistData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaryData();
  }, [userId]);

  return (
    <CalendarWrap>
      <Header>
        <BackButton />
        <MyPageText>캘린더</MyPageText>
      </Header>
      <CalendarBox>
        <Calendar
          formatDay={(locale, date) => moment(date).format("D")}
          value={selectedDate}
          onChange={setSelectedDate}
          tileClassName={({ date }) =>
            extractedDates.includes(moment(date).format("YYYY-MM-DD"))
              ? "selected-date"
              : null
          }
        />
      </CalendarBox>
      {selectedDate && (
        <CalendarDiaryBox>
          <Date>{moment(selectedDate).format("YY.MM.DD")}</Date>
          <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
          {!diary ? (
            <NoneDiary />
          ) : (
            <>
              <ImgWrap>
                {diary.imgLinks.length === 1 && (
                  <>
                    {diary.imgLinks.map((imgUrl, index) => (
                      <>
                        <DiaryImage1 src={imgUrl} alt="하루네컷 이미지" />
                      </>
                    ))}
                  </>
                )}
                {diary.imgLinks.length === 2 && (
                  <>
                    {diary.imgLinks.map((imgUrl, index) => (
                      <>
                        <DiaryImage2 src={imgUrl} alt="하루네컷 이미지" />
                      </>
                    ))}
                  </>
                )}
                {diary.imgLinks.length === 4 && (
                  <>
                    {diary.imgLinks.map((imgUrl, index) => (
                      <>
                        <DiaryImage4 src={imgUrl} alt="하루네컷 이미지" />
                      </>
                    ))}
                  </>
                )}
              </ImgWrap>
              <Button
                width="260px"
                to={`/haru4cut/${diary.diaryId}`}
                padding="11px 0px"
                height="20px"
              >
                자세히 보기
              </Button>
            </>
          )}
        </CalendarDiaryBox>
      )}
    </CalendarWrap>
  );
}

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;

const CalendarDiaryBox = styled.div`
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 45%;
  margin-top: 10px;
  padding: 5px 0px 10px 0px;
  margin-bottom: 20px;
`;

const Date = styled.div`
  font-size: 15px;
  color: #5b8fbe;
  font-weight: 600;
  margin-top: 20px;
`;

const DiaryImage1 = styled.img`
  margin: 5px;
  width: 110px;
`;

const DiaryImage2 = styled.img`
  margin: 5px;
  width: 160px;
`;

const DiaryImage4 = styled.img`
  margin: 5px;
  width: 9dvb;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 220px;
  margin: 10px 0px 10px 0px;
`;

const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 22px;
  margin-top: 5px;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  position: relative;
  font-family: "KotraHope";
  font-size: 24px;
  text-align: center;
`;

const MyPageText = styled.div`
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CalendarBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
