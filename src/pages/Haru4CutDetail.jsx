import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import moment from "moment";
import { ReactComponent as FavoriteIcon } from "../assets/images/FavoriteIcon.svg";
import Button from "../components/common/Button";
import DiaryEditIcon from "../assets/images/DiaryEditIcon.svg";
import ShareIcon from "../assets/images/ShareIcon.svg";
import axios from "axios";

export default function Haru4CutDetail({ selectedDate }) {
  const [diaries, setDiaries] = useState([]); // 해당 날짜의 일기 데이터
  const DiaryImgList = [
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
    "https://ifh.cc/g/4bZ6CR.png",
  ];
  const ImgNum = 4;
  const [heartStates, setHeartStates] = useState(Array(ImgNum).fill(true));
  const defaultTextAreaValue = `자세한 이 날 스토리, 네컷일기에 대한 \n느낌 등 일기를 더 기록해보세요 :) \n\n기록할 것이 없다면 줄글 일기 없이\n사진만으로도 일기를 완성할 수 있어요!`;

  // 글자수 표시
  const [textDiary, setTextDiary] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 일기 완성 후 표시 여부
  const [showDiary, setShowDiary] = useState(false);
  const onInputHandler = (e) => {
    setTextDiary(e.target.value);
    setInputCount(e.target.value.length);
  };
  // 일기 완성하기 버튼
  const onCompleteButtonClick = () => {
    setShowDiary(true);
  };
  // 일기 수정하기 버튼
  const onEditButtonClick = () => {
    setShowDiary(false);
  };
  // 일기 공유하기 버튼
  const onShareButtonClick = () => {};

  // 좋아요
  const onClickHeart = (index) => {
    setHeartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  //test diaryId
  const diaryId = 3;

  //테스트 코드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://52.79.154.88:8080/diaries/0`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        console.log("테스트", response.data.result);
      } catch (error) {
        console.error("테스트", error);
      }
    };

    fetchData();
  }, []);
  // 연동 코드
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(
          `http://52.79.154.88:8080/users/${diaryId}/diaries`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        console.log(response.data);
        setDiaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaries();
  }, []);
  return (
    <MainWrap>
      <Header />
      <TodaysDiaryWrap>
        <Date>{moment(selectedDate).format("YY.MM.DD")}</Date>
        <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
        <ImgWrap>
          {DiaryImgList.map((imgUrl, index) => (
            <>
              <DiaryImage src={imgUrl} alt="하루네컷 이미지" />
              <StyledFavoriteIcon
                onClick={() => onClickHeart(index)}
                fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                alt="heart icon"
              />
            </>
          ))}
        </ImgWrap>

        {showDiary ? (
          <>
            <DiaryText>{textDiary}</DiaryText>
            <Button onClick={onEditButtonClick} marginBottom="6px">
              <StyledIcon src={DiaryEditIcon} />
              일기 수정하기
            </Button>
            <Button
              onClick={onShareButtonClick}
              backgroundColor="#8A8A8A"
              marginBottom="6px"
              to={`/haru4cut/${diaryId}/share`}
            >
              <StyledIcon src={ShareIcon} />
              일기 공유하기
            </Button>
          </>
        ) : (
          <>
            <DiaryTextArea
              placeholder={defaultTextAreaValue}
              onChange={onInputHandler}
              maxLength={129}
              value={textDiary}
            ></DiaryTextArea>
            <CountText>{inputCount}/130</CountText>
            <Button onClick={onCompleteButtonClick}>일기 완성하기</Button>
          </>
        )}
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
  margin: 20px 0px 20px 20px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 115px;
  left: -21px;
  cursor: pointer;
`;

const DiaryText = styled.div`
  font-family: "KotraHope";
  color: #717171;
  margin-bottom: 40px;
  width: 240px;
  font-size: 17px;
  text-decoration: underline;
  text-underline-offset: 4px;
  line-height: 170%;
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
const CountText = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 400;
  width: 282px;
  text-align: right;
  margin: 7px 15px 20px 0px;
`;

const StyledIcon = styled.img`
  margin-right: 5px;
`;
