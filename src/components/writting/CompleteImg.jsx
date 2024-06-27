import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import Button from "../common/Button";
import { ReactComponent as FavoriteIcon } from "../../assets/images/FavoriteIcon.svg";
import Header from "../common/Header";

const CompleteImg = () => {
  const defaultTextAreaValue = `자세한 이 날 스토리, 네컷일기에 대한 \n느낌 등 일기를 더 기록해보세요 :) \n\n기록할 것이 없다면 줄글 일기 없이\n사진만으로도 일기를 완성할 수 있어요!`;
  const location = useLocation();
  const { responseData } = location.state || {}; // 추가: location.state가 없을 경우 기본값 설정
  console.log("CompleteImg:", responseData);
  //const date = useSelector((state) => state.diary.date);
  const [diaries, setDiaries] = useState([]); // 해당 날짜의 일기 데이터
  // 글자수 표시
  const [textDiary, setTextDiary] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // 로컬 스토리지에서 userId 가져오기
  const [date, setDate] = useState(localStorage.getItem("date")); // 로컬 스토리지에서 userId 가져오기
  // 일기 완성하기 버튼
  const onCompleteButtonClick = async () => {
    const payload = {
      cutNum: diaries.length,
      imgLinks: diaries.map((diary) => diary.url),
      date: date, // Example date, you can update it as needed
      text: textDiary,
    };

    try {
      const response = await axiosInstance.post(`/diary/${userId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 일기 완성 후 표시 여부

  const onInputHandler = (e) => {
    setTextDiary(e.target.value);
    setInputCount(e.target.value.length);
  };

  useEffect(() => {
    if (responseData && responseData.imgLinks) {
      const imageDataArray = responseData.imgLinks.map((link) => {
        const [number, url] = link.split(" : ");
        return { number: number.trim(), url: url.trim() };
      });
      setDiaries(imageDataArray);
    }
  }, [responseData]);

  return (
    <MainWrap>
      <TodaysDiaryWrap>
        <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
        <Date>24.03.17</Date>
        <ImgWrap>
          {diaries.length === 1 && (
            <DiaryImage1 src={diaries[0].url} alt="하루네컷 이미지" />
          )}
          {diaries.length === 2 &&
            diaries.map((diary, index) => (
              <DiaryImage2 src={diary.url} alt="하루네컷 이미지" key={index} />
            ))}
          {diaries.length === 4 && (
            <>
              {diaries.map((diary, index) => (
                <DiaryImage src={diary.url} alt="하루네컷 이미지" key={index} />
              ))}
            </>
          )}
        </ImgWrap>
        <DiaryTextArea
          placeholder={defaultTextAreaValue}
          onChange={onInputHandler}
          maxLength={129}
          value={textDiary}
        ></DiaryTextArea>
        <CountText>{inputCount}/130</CountText>
        <SubmitButton onClick={onCompleteButtonClick}>
          일기 완성하기
        </SubmitButton>
      </TodaysDiaryWrap>
    </MainWrap>
  );
};

export default CompleteImg;

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;
const DiaryTextArea = styled.textarea`
  text-decoration: none;
  outline: none;
  width: 240px;
  height: 160px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 20px;
  font-size: 15px;
  font-family: Pretendard;
  line-height: 135%;
  resize: none;

  &::placeholder {
    color: #b6b6b6;
  }
`;

const SubmitButton = styled.div`
  text-decoration: none;
  font-size: 14px;
  background-color: #5370d4;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 11px 69px;
  cursor: pointer;
  font-family: Pretendard;
  margin-bottom: 20px;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 28px;
  margin-top: 30px;
`;

const Date = styled.div`
  font-size: 18px;
  color: #5b8fbe;
  font-weight: 600;
  margin-top: 20px;
`;
const TodaysDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  //width: 85%;
  height: 90vh;
  margin-bottom: 20px;
`;
const CountText = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 400;
  width: 282px;
  text-align: right;
  margin: 7px 15px 20px 0px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  margin: 20px 0px 20px 20px;
`;

// 4컷일 때 다이어리 이미지
const DiaryImage = styled.img`
  width: 120px;
  margin: 5px 3px 3px 3px;
`;
// 1컷일 때 다이어리 이미지
const DiaryImage1 = styled.img`
  width: 200px;
`;
// 2컷일 때 다이어리 이미지
const DiaryImage2 = styled.img`
  width: 250px;
  margin: 5px 0px;
`;
