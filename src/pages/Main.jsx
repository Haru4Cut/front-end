import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import TodaysDiary from "../components/main/TodaysDiary";
import MemoryDiary from "../components/main/MemoryDiary";
import axiosInstance from "../api/axiosInstance";
export default function Main() {
  // const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   const postData = async () => {
  //     try {
  //       const data = {
  //         cutNum: 2,
  //         imgLinks: [
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-17-0",
  //           "https://s3.ap-northeast-2.amazonaws.com/haru4cut/%ED%8F%B4%EB%8D%94%EB%AA%85/33-2024-06-17-1",
  //         ],
  //         date: "2024-06-16",
  //         text: "오늘은 내 20살 생일이었다! 오전에 친구들과 클라이밍을 하고 생일파티를 했다-! 친구들이 생일 선물을 많이 줘서 기쁜 하루였다. 저녁에 아빠가 케이크를 사와서 가족들끼리 케이크도 먹었다! 행복한 생일~",
  //       };

  //       const response = await axiosInstance.post(`/diaries/${userId}`, data);
  //       console.log("POST 요청 성공:", response.data);
  //       // 데이터를 성공적으로 처리한 후 필요한 작업 수행
  //     } catch (error) {
  //       console.error("POST 요청 실패:", error);
  //       // 실패 시 에러 처리 로직 추가
  //     }
  //   };

  //   postData();
  // }, []); // 빈 의존성 배열을 넘겨 한 번만 요청을 보내도록 설정
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
