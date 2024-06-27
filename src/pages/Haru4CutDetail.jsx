import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import moment from "moment";
import { ReactComponent as FavoriteIcon } from "../assets/images/FavoriteIcon.svg";
import Button from "../components/common/Button";
import DiaryEditIcon from "../assets/images/DiaryEditIcon.svg";
import ShareIcon from "../assets/images/ShareIcon.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
export default function Haru4CutDetail({ selectedDate }) {
  const [diaries, setDiaries] = useState([]); // 해당 날짜의 일기 데이터
  const { diaryid } = useParams(); // 현재 diaryId

  const [heartStates, setHeartStates] = useState([]);
  const defaultTextAreaValue = `자세한 이 날 스토리, 네컷일기에 대한 \n느낌 등 일기를 더 기록해보세요 :) \n\n기록할 것이 없다면 줄글 일기 없이\n사진만으로도 일기를 완성할 수 있어요!`;

  // 글자수 표시
  const [textDiary, setTextDiary] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 일기 완성 후 표시 여부
  const [showDiary, setShowDiary] = useState(true);
  const onInputHandler = (e) => {
    setTextDiary(e.target.value);
    setInputCount(e.target.value.length);
  };
  // 일기 완성하기 버튼
  const onCompleteButtonClick = async () => {
    try {
      const updatedDiary = {
        diaryId: diaries.diaryId,
        date: diaries.date,
        text: textDiary,
        imgLinks: diaries.imgLinks,
      };

      // PATCH 요청 보내기
      const response = await axiosInstance.patch(
        `/diaries/${diaries.diaryId}`,
        updatedDiary
      );

      console.log("일기 수정", response);
      setShowDiary(true);
      fetchDiaries();
    } catch (error) {
      console.error(error);
    }
  };

  // 일기 수정하기 버튼
  const onEditButtonClick = () => {
    setShowDiary(false);
  };
  // 일기 공유하기 버튼
  const onShareButtonClick = () => {};

  // 좋아요
  const onClickHeart = async (index, imgUrl) => {
    setHeartStates((prevHeartStates) => {
      const newHeartStates = [...prevHeartStates];
      newHeartStates[index] = !newHeartStates[index];
      return newHeartStates;
    });
    try {
      const response = await axiosInstance.post(
        `/likes/${localStorage.getItem("userId")}`,
        {
          url: imgUrl,
        }
      );
      console.log(imgUrl);
      console.log(`/likes/userId`, response);
    } catch (error) {
      console.log(imgUrl);
      console.error(error);
    }
  };
  // diaries.text 값에 따라 textDiary 초기 값 설정
  useEffect(() => {
    if (diaries.text && diaries.text !== "") {
      setTextDiary(diaries.text);
      setInputCount(diaries.text.length);
    } else {
      setTextDiary("");
      setInputCount(0);
    }
  }, [diaries.text]);

  // 현재 diaryid의 일기 가져오기
  // 현재 diaryid의 일기 가져오기
  const fetchDiaries = async () => {
    try {
      const response = await axiosInstance.get(`/diaries/${diaryid}`);
      console.log(`/diaries/${diaryid}`, response);
      setDiaries(response.data);

      const initialHeartStates = Array(response.data.imgLinks.length).fill(
        false
      );
      setHeartStates(initialHeartStates);

      response.data.imgLinks.forEach(async (imgLink, index) => {
        try {
          console.log(index, imgLink);
          const response = await axiosInstance.post(`/likes/events`, {
            url: imgLink,
          });
          console.log(index, "의 response", response);
          if (response.data === 1) {
            setHeartStates((prevHeartStates) => {
              const newHeartStates = [...prevHeartStates];
              newHeartStates[index] = true;
              return newHeartStates;
            });
          }
        } catch (error) {
          console.error(`/like/events 에러 ${imgLink}`, error);
        }
      });
    } catch (error) {
      console.error(`/diaries/${diaryid} 에러`, error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [diaryid]);

  return (
    <MainWrap>
      <Header />
      <TodaysDiaryWrap>
        <Date>{moment(diaries.date).format("YY.MM.DD")}</Date>
        <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
        {diaries && diaries.length !== 0 ? (
          <>
            <ImgWrap>
              {/* cutNum 1일 때 */}
              {diaries.imgLinks.length === 1 && (
                <>
                  <DiaryImage1
                    src={diaries.imgLinks[0]}
                    alt="하루네컷 이미지"
                  />
                  <StyledFavoriteIcon1
                    onClick={() => onClickHeart(0, diaries.imgLinks[0])}
                    fill={heartStates[0] ? "#E54B4B" : "#C7C7C7"}
                    alt="heart icon"
                  />
                </>
              )}
              {/* cutNum 2일 때 */}
              {diaries.imgLinks.length === 2 && (
                <>
                  {diaries.imgLinks.map((imgUrl, index) => (
                    <>
                      <DiaryImage2
                        src={imgUrl}
                        alt="하루네컷 이미지"
                        key={index}
                      />
                      <StyledFavoriteIcon2
                        onClick={() => onClickHeart(index, imgUrl)}
                        fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                        alt="heart icon"
                      />
                    </>
                  ))}
                </>
              )}
              {/* cutNum 4일 때 */}
              {diaries.imgLinks.length === 4 && (
                <>
                  {diaries.imgLinks.map((imgUrl, index) => (
                    <>
                      <DiaryImage
                        src={imgUrl}
                        alt="하루네컷 이미지"
                        key={index}
                      />
                      <StyledFavoriteIcon
                        onClick={() => onClickHeart(index, imgUrl)}
                        fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                        alt="heart icon"
                      />
                    </>
                  ))}
                </>
              )}
            </ImgWrap>

            {showDiary ? (
              <>
                <DiaryText>{diaries.text}</DiaryText>
                <Button
                  onClick={onEditButtonClick}
                  marginBottom="6px"
                  height="38px"
                >
                  <StyledIcon src={DiaryEditIcon} />
                  일기 수정하기
                </Button>
                <Button
                  onClick={onShareButtonClick}
                  backgroundColor="#8A8A8A"
                  marginBottom="6px"
                  to={`/haru4cut/${diaryid}/share`}
                  height="38px"
                >
                  <StyledIcon src={ShareIcon} />
                  일기 완성하기
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
          </>
        ) : (
          <ErrorMessage>
            잘못된 접근입니다. {"\n"} 해당 일기가 존재하지 않습니다 :(
          </ErrorMessage>
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
  font-size: 16px;
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
  margin-top: 5px;
`;
// 4컷일 때 다이어리 이미지
const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
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
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  margin: 20px 0px 20px 20px;
`;
// 4컷일 때 하트 아이콘
const StyledFavoriteIcon = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 115px;
  left: -21px;
  cursor: pointer;
`;
// 1컷일 때 하트 아이콘
const StyledFavoriteIcon1 = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 315px;
  left: -30px;
  cursor: pointer;
`;
// 2컷일 때 하트 아이콘
const StyledFavoriteIcon2 = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 120px;
  left: -30px;
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
const ErrorMessage = styled.div`
  color: #616161;
  font-size: 14px;
  white-space: pre-wrap;
  margin-top: 30px;
  margin-bottom: 40%;
  align-items: center;
  text-align: center;
  line-height: 150%;
`;
