import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import FourInput from "./FourInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//KwywordInput > Form > FourInputNcut
const Form = (props) => {
  //4input + 컷 정보 + 좌우 버튼
  const navigate = useNavigate();
  const cutNum = useSelector((state) => state.cutNum);
  const date = useSelector((state) => state.date);

  const [currentCutIdx, setCurrentCutIdx] = useState(0);
  const [cutForms, setCutForms] = useState([]);
  //const [imgUrl, setImgUrl] = useState(null);
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

  const userId = 1;
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
      const response = await axios.post(
        `/diaries/${userId}/events`,
        JSON.stringify(requestData),
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log("서버 응답:", response.data);
      // 응답을 받은 후 '/createdimage' 페이지로 이동
      // 이미지 링크와 함께 '/createdImg' 페이지로 이동
      navigate("/createdImg");
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
  margin-bottom: 20px;
`;
const PrevButton = styled.img`
  height: 70px;
  cursor: pointer;
  margin-top: 30%; /* Add margin to move the arrow image slightly downwards */
`;
const NextButton = styled.img`
  height: 70px;
  cursor: pointer;
  margin-top: 30%; /* Add margin to move the arrow image slightly downwards */
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
`;
const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
