import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import TodaysDiary from "../components/main/TodaysDiary";
import MemoryDiary from "../components/main/MemoryDiary";
import axiosInstance from "../api/axiosInstance";
export default function Main() {
  // console.log("테스트");
  // const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   const postData = async () => {
  //     try {
  //       const data = {
  //         cutNum: 1,
  //         imgLinks: [
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-04-18-0",
  //         ],
  //         date: "2024-04-18",
  //         text: "24년 4444월 18일 입니다 친구랑 엽떡을 먹었습니다",
  //       };

  //       const response = await axiosInstance.post(`/diaries/${userId}`, data);
  //       console.log("테스트 데이터 넣기", response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   postData();
  // }, []);
  return (
    <MainWrap>
      <Header />
      {/*오늘의 네컷일기*/}
      <TodaysDiaryWrap>
        <TodaysDiary></TodaysDiary>
      </TodaysDiaryWrap>
      {/*추억일기*/}
      <MemoryDiaryWrap>
        <MemoryDiary></MemoryDiary>
      </MemoryDiaryWrap>
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;

const TodaysDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 50%;
`;
const MemoryDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 38%;
  margin-top: 12px;
  margin-bottom: 20px;
`;
