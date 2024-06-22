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
  //         cutNum: 4,
  //         imgLinks: [
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-21-0",
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-21-1",
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-21-2",
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-21-3",
  //         ],
  //         date: "2024-06-21",
  //         text: "오늘은 친구랑 카페에서 공부를 하다가 사당역 클라이밍장에서 클라이밍을 했다. 그 후 치킨집에서 동아리 친구들과 치맥을 했다. 즐거운 하루였다 ^-^",
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
