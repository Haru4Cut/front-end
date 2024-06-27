import styled from "styled-components";
import Header from "../components/common/Header";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../components/writting/Form";

import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const KeywordInputPage = () => {
  const navigate = useNavigate();
  const cutNum = useSelector((state) => state.cutNum);
  const date = useSelector((state) => state.date);
  const [currentCutIdx, setCurrentCutIdx] = useState(0);
  const [cutForms, setCutForms] = useState([]);
  const userId = useSelector((state) => state.userId);
  useEffect(() => {
    setCutForms(
      Array.from({ length: cutNum }, (_, index) => ({
        //props.cutNum의 길이만큼 새로운 배열을 생성
        other: "", //배열의 각 요소는 other, place, action, emotion 프로퍼티를 가진 객체
        place: "",
        action: "",
        emotion: 1, //이때, emotion 프로퍼티는 기본값으로 1이 설정
        date: date,
        // 현재 날짜를 기본값으로 설정
        orderNum: index,
      }))
    );
  }, [cutNum, date]);

  const handleInputChange = (currentCutIdx, field, value) => {
    const newCutForms = [...cutForms];
    newCutForms[currentCutIdx][field] = value;
    setCutForms(newCutForms);
  };

  const handleEmotionChange = (selectedOption, index) => {
    const newCutForms = [...cutForms];
    newCutForms[index].emotion = parseInt(selectedOption);
    setCutForms(newCutForms);
  };

  const handlePrevButtonClick = (prevIndex) => {
    setCurrentCutIdx((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextButtonClick = () => {
    setCurrentCutIdx((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= cutNum ? prevIndex : nextIndex;
    });
  }; //다음 cut이 cutNum을 넘어가면 더이상 안넘어가게 하는 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = cutForms.map((cut) => ({
      cutNum: cutNum,
      emotion: cut.emotion,
      keywords: [cut.other, cut.place, cut.action],
      date: cut.date,
      orderNum: cut.orderNum,
      // 변경된 부분-> cut의 date 속성을 직접 백엔드에 보냄
    }));
    console.log("rq", JSON.stringify(requestData));
    // 버튼을 누르자마자 '/loading' 페이지로 이동
    navigate("/loading");

    try {
      const response = await axiosInstance.post(
        `/diaries/${userId}/events`,
        JSON.stringify(requestData)
      );
      console.log("서버 응답:", response.data);
      // 응답을 받은 후 '/createdimage' 페이지로 이동
      // 이미지 링크와 함께 '/createdImg' 페이지로 이동
      navigate("/createdImg", { state: { imageData: response.data } });
    } catch (error) {
      console.error("서버 요청 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <>
      <div className="wrap">
        <Header />
        <KeywordInputWrap>
          <div>
            <TopBox>
              <TopText>오늘 무슨 일이 있었나요?</TopText>
              <MiddleText>당신의 하루를 기록해주세요!</MiddleText>
            </TopBox>
          </div>
          <div>
            <Form
              handleSubmit={handleSubmit}
              cutNum={cutNum}
              date={date}
              handleInputChange={handleInputChange}
              handleEmotionChange={handleEmotionChange}
              handlePrevButtonClick={handlePrevButtonClick}
              handleNextButtonClick={handleNextButtonClick}
            />
          </div>
        </KeywordInputWrap>
      </div>
    </>
  );
};

export default KeywordInputPage;

const KeywordInputWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 80%;
  padding-top: 15px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  margin-bottom: 30px;
`;

const TopText = styled.div`
  font-family: "Pretendard";
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
`;

const MiddleText = styled.div`
  font-family: "Pretendard";
  font-size: 13px;
  color: #6c6c6c;
`;
