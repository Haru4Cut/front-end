import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const CutSelect = () => {
  const [clickedIdx, setClickedIdx] = useState(0);
  const [cutNum, setLocalCutNum] = useState(
    parseInt(localStorage.getItem("cutNum")) || 1 // localStorage에서 가져오는 값은 정수로 파싱
  );

  const dispatch = useDispatch();

  const handleCutClick = (index) => {
    setClickedIdx(index);
    let num;
    switch (index) {
      case 0:
        num = 1;
        break;
      case 1:
        num = 2;
        break;
      case 2:
        num = 4;
        break;
      default:
        break;
    }
    setLocalCutNum(num);
    localStorage.setItem("cutNum", num); // 정수로 저장
    console.log("num", num);
  };

  const buttons = ["1cut", "2cut", "4cut"];

  return (
    <div>
      <CutSelectWrap>
        <div className="row">
          {buttons.map((clickedcut, index) => (
            <CutButton
              className="col"
              type="submit"
              onClick={() => {
                handleCutClick(index);
              }}
              clicked={clickedIdx === index}
              key={index} // key prop을 추가
            >
              {clickedcut}
            </CutButton>
          ))}
        </div>
        <FrameContainer>
          <FrameImage
            src={`/images/${cutNum}cutframe.png`}
            alt={`${cutNum}cut`}
          />
        </FrameContainer>
        <SubmitButton to="/writing/date">선택</SubmitButton>
      </CutSelectWrap>
    </div>
  );
};

export default CutSelect;

const SubmitButton = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  background-color: #5370d4;
  color: white;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  padding: 11px 69px;
  cursor: pointer;
  font-family: Pretendard;
`;

const CutButton = styled(Button)`
  background: ${(props) =>
    props.clicked ? "rgba(83, 112, 212, 1)" : "rgba(232, 234, 236, 1)"};
  color: ${(props) => (props.clicked ? "white" : "rgba(140, 140, 140, 1)")};
  border: none;
  margin-left: 4vw;
  margin-right: 4vw;
  height: 30px;
  width: 50px;
  font-size: 12px;
  border-radius: 20px;
`;

const CutSelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FrameContainer = styled.div`
  width: 75vw; /* 프레임의 초기 너비 설정 */
  height: 50vh; /* 프레임의 초기 높이 설정 */
  margin-top: 5vh;
  margin-bottom: 5vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameImage = styled.img`
  object-fit: contain; /* 이미지가 프레임 내에 맞게 조절됨 */
  width: 80%; /* 이미지의 너비를 프레임의 너비에 맞게 조절 */
  height: 80%; /* 이미지의 높이를 프레임의 높이에 맞게 조절 */
  margin-top: 20px;
`;
