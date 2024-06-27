import styled from "styled-components";
import { useEffect, useState } from "react";
import FourInput from "./FourInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Form = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [date, setDate] = useState(localStorage.getItem("date"));
  const [cutNum, setCutNum] = useState(localStorage.getItem("cutNum"));

  const [currentCutIdx, setCurrentCutIdx] = useState(0);
  const [cutForms, setCutForms] = useState([]);

  console.log("userId", userId);

  console.log("date", date);

  console.log("cutNum", cutNum);
  useEffect(() => {
    if (cutNum) {
      const initialCutForms = Array.from(
        { length: parseInt(cutNum) },
        (_, index) => ({
          other: "",
          place: "", // 초기값 설정
          action: "",
          emotion: 1,
          date: date,
          orderNum: index,
        })
      );
      setCutForms(initialCutForms);
    }
  }, [cutNum, date]);

  const handleInputChange = (currentCutIdx, field, value) => {
    if (currentCutIdx >= 0 && currentCutIdx < cutForms.length) {
      const newCutForms = cutForms.map((cut, index) =>
        index === currentCutIdx ? { ...cut, [field]: value } : cut
      );
      setCutForms(newCutForms);
    }
  };

  const handleEmotionChange = (selectedOption, index) => {
    if (index >= 0 && index < cutForms.length) {
      const newCutForms = cutForms.map((cut, idx) =>
        idx === index ? { ...cut, emotion: parseInt(selectedOption) } : cut
      );
      setCutForms(newCutForms);
    }
  };

  const handlePrevButtonClick = () => {
    setCurrentCutIdx((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextButtonClick = () => {
    setCurrentCutIdx((prevIndex) =>
      Math.min(prevIndex + 1, parseInt(cutNum) - 1)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = cutForms.map((cut) => ({
      cutNum: cutNum,
      emotion: cut.emotion,
      keywords: [cut.other, cut.place, cut.action],
      date: cut.date,
      orderNum: cut.orderNum,
    }));
    console.log("Request Data:", JSON.stringify(requestData));

    navigate("/loading");

    try {
      const response = await axiosInstance.post(
        `/diaries/${userId}/events`,
        JSON.stringify(requestData)
      );
      console.log("서버 응답:", response.data);

      navigate(`/diaries/${userId}/events`, {
        state: { responseData: response.data },
      });
    } catch (error) {
      console.error("서버 요청 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <TotalWrap>
      <FormWrap>
        <PrevButton
          src={"/images/PrevButton.png"}
          onClick={handlePrevButtonClick}
        />
        <FourInput
          cut={cutForms[currentCutIdx]}
          currentCutIdx={currentCutIdx}
          handleInputChange={handleInputChange}
          handleEmotionChange={handleEmotionChange}
        />
        <NextButton
          src={"/images/Nextbutton.png"}
          onClick={handleNextButtonClick}
        />
      </FormWrap>
      <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
    </TotalWrap>
  );
};

export default Form;

const FormWrap = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const PrevButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const NextButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
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
  margin-top: 10px;
`;

const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
