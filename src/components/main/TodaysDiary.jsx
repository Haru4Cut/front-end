import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NoneDiary from "./NoneDiary";
import ExistDiary from "./ExistDiary";
import axios from "axios";
export default function TodaysDiary() {
  //오늘 날짜
  function getToday() {
    var date = new Date();
    var year = date.getFullYear().toString().slice(-2);
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "." + month + "." + day;
  }
  const diaryId = 1;
  const diaryImgList = [
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
  ];

  const [todayDiaryData, setTodayDiaryData] = useState()
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchDiaaryDate = async () => {
      try {
        const response = await axios.get(`/users/${userId}/diarybydate`);
        console.log(response.data);
        setTodayDiaryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaaryDate();
  }, []);
  return (
    <>
      <TodayDate>{getToday()}</TodayDate>
      <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
      {/* <NoneDiary /> */}
      <ExistDiary diaryId={diaryId} diaryImgList={diaryImgList}/> 
    </>
  );
}

const TodayDate = styled.div`
  align-items: center;
  text-align: center;
  color: #5b8fbe;
  font-weight: 600;
  font-size: 16px;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
`;
