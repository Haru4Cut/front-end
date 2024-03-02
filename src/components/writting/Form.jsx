import styled from "styled-components";
import { useEffect, useState } from "react";
import FourInput from "./FourInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//KwywordInput > Form > FourInputNcut
const Form = (props) => {
  //4input + 컷 정보 + 좌우 버튼
  const navigate = useNavigate();
  const cutNum = useSelector((state) => state.cutNum);

  const [currentCutIdx, setCurrentCutIdx] = useState(0);

  const [cutForms, setCutForms] = useState([]);
  useEffect(() => {
    setCutForms(
      Array.from({ length: cutNum }, () => ({
        //props.cutNum의 길이만큼 새로운 배열을 생성
        other: "", //배열의 각 요소는 other, place, action, emotion 프로퍼티를 가진 객체
        place: "",
        action: "",
        emotion: 1, //이때, emotion 프로퍼티는 기본값으로 1이 설정
        // 현재 날짜를 기본값으로 설정
      }))
    );
  }, [cutNum]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = cutForms.map((cut) => ({
      keywords: [cut.other, cut.place, cut.action],
      emotion: cut.emotion,
      cutNum: cutNum,
      // 변경된 부분: cut의 date 속성을 직접 백엔드에 보냄
    }));
    console.log("API 요청 보내기:", requestData);
    navigate("/loading");
  };

  return (
    <TotalWrap>
      <FormWrap>
        <PrevButton
          src={"/images/PrevButton.png"}
          onClick={handleNextButtonClick}
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
  height: 100px;
  cursor: pointer;
  margin-top: 20%; /* Add margin to move the arrow image slightly downwards */
`;
const NextButton = styled.img`
  height: 100px;
  cursor: pointer;
  margin-top: 20%; /* Add margin to move the arrow image slightly downwards */
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
