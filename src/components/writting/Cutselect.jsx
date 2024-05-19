import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCutNum } from "../../store";

const CutSelect = () => {
  const [clickedIdx, setClickedIdx] = useState(0);
  const cutNum = useSelector((state) => {
    return state.cutNum;
  }); // Redux 상태를 읽어옴
  const dispatch = useDispatch();

  const handleCutClick = (index) => {
    setClickedIdx(index);
    let num;
    switch (index) {
      case 0:
        num = 1;
        break; // 각 case 블록의 마지막에 break를 추가
      case 1:
        num = 2;
        break;
      case 2:
        num = 4;
        break;
      default:
        break;
    }
    dispatch(setCutNum(num));
    console.log(num);
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
              clicked={clickedIdx == index}
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
        <SubmitButton to="/writting/date">선택</SubmitButton>
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
    props.clicked ? " rgba(83, 112, 212, 1)" : "rgba(232, 234, 236, 1)"};
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
  //background-color: pink;
  width: 75vw; /* 프레임의 초기 너비 설정 */
  height: 50vh; /* 프레임의 초기 높이 설정 */
  margin-top: 5vh;
  margin-bottom: 5vh;
  //overflow: hidden; /* 프레임을 넘는 컨텐츠 숨김 */
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
