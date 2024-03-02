import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import moment from "moment";

export default function Share() {
  const DiaryImgList = [
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
  ];
  // 오늘 날짜
  var date = new window.Date();
  return (
    <MainWrap>
      <Logo>Haru4cut</Logo>
      <TodaysDiaryWrap>
        <Date>{moment(date).format("YY.MM.DD")}</Date>
        <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
        <ImgWrap>
          {DiaryImgList.map((imgUrl, index) => (
            <>
              <DiaryImage src={imgUrl} alt="하루네컷 이미지" />
            </>
          ))}
        </ImgWrap>
      </TodaysDiaryWrap>
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
const Logo = styled.div`
  font-family: KotraHope;
  color: #9cbedd;
  font-size: 42px;
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
  height: 90%;
  margin-bottom: 20px;
`;
const Date = styled.div`
  font-size: 18px;
  color: #5b8fbe;
  font-weight: 600;
  margin-top: 20px;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 28px;
  margin-top: 10px;
`;
const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
`;
