import styled from "styled-components";
import Form from "./Form";
import { Link } from "react-router-dom";

const KeywordInput = () => {
  return (
    <>
      <KeywordInputWrap>
        <div>
          <TopBox>
            <TopText>오늘 무슨 일이 있었나요?</TopText>
            <MiddleText>당신의 하루를 기록해주세요!</MiddleText>
          </TopBox>
          <WrittingContainer>
            <Form /> {/*컷 정보 & 네 가지 인풋이 들어감*/}
          </WrittingContainer>
        </div>
      </KeywordInputWrap>
    </>
  );
};

export default KeywordInput;

const KeywordInputWrap = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WrittingContainer = styled.div`
  background-color: pink;
  //width: 75vw; /* 프레임의 초기 너비 설정 */
  height: 65vh; /* 프레임의 초기 높이 설정 */
  margin-top: 5%;
  margin-bottom: 5%;
  overflow: hidden; /* 프레임을 넘는 컨텐츠 숨김 */
  display: flex;
  justify-content: center;

  align-items: center;
`;
const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const TopText = styled.div`
  font-family: "KotraHope";
  margin-bottom: 15px;
  font-size: 2rem;
`;

const MiddleText = styled.div`
  font-family: "PoetsenOne";
  font-size: 1rem;
`;
