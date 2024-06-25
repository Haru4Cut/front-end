import styled from "styled-components";
import CutSelect from "../components/writting/Cutselect";
import Header from "../components/common/Header";
import { SyncLoader } from "react-spinners";
import { ReactComponent as LogoSquare } from "../../src/assets/images/LogoSquare.svg";
const SubmitLoadingPage = () => {
  return (
    <div className="wrap">
      <Header />
      <LoadingWrap>
        <LogoSquare style={{ width: "100px" }} />
        <LoadingText>그림을 생성중이에요 </LoadingText>

        <MsgText>AI가 그림을 그리는데 시간이 걸릴 수 있습니다. </MsgText>
        <MsgText style={{ marginBottom: "10vh" }}>잠시만 기다려주세요 </MsgText>

        <SyncLoader color="#8AD7E4" />
      </LoadingWrap>
    </div>
  );
};

export default SubmitLoadingPage;

const LoadingWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 80%;
`;

const LoadingText = styled.div`
  //margin-bottom: 50px;
  margin-top: 5vh;
  font-family: "Pretendard";
  font-weight: bold;
  font-size: 18px;
  color: #2986ff;
`;
const MsgText = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-family: "Pretendard";

  color: #8c8c8c;
`;
