import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import Calendar from "react-calendar";
import "./calendarStyles.css";
import moment from "moment";
import Button from "../components/common/Button";
import axios from "axios";
export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState();
  const DiaryImgList = [
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
  ];
  const [isheartToggle, SetIsheartToggle] = useState(true);
  const heartIconColor = isheartToggle ? "#E54B4B" : "#C7C7C7";
  const [diaryId, setDiaryId] = useState();
  const userId = 1;
  useEffect(() => {
    const fetchDiaaryDate = async () => {
      try {
        const response = await axios.get(`/users/${userId}/diarybydate`, {
          params: {
            date: moment(selectedDate).format("YY-MM-DD"),
          },
        });
        console.log(response.data);
        setDiaryId(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaaryDate();
  }, [selectedDate]);
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
        />
      </CalendarBox>
      {selectedDate && (
        <CalendarDiaryBox>
          <Date>{moment(selectedDate).format("YY.MM.DD")}</Date>
          <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
          <ImgWrap>
            {DiaryImgList.map((imgUrl, index) => (
              <>
                <DiaryImage src={imgUrl} alt="하루네컷 이미지" />
              </>
            ))}
          </ImgWrap>
          <Button width="260px" to={`/haru4cut/${diaryId}`}>
            자세히 보기
          </Button>
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
  padding: 10px 0px 20px 0px;
`;

const Date = styled.div`
  font-size: 16px;
  color: #5b8fbe;
  font-weight: 600;
  margin-top: 20px;
`;

const DiaryImage = styled.img`
  margin: 5px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 260px;
  margin: 20px 0px 20px 0px;
`;

const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
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
