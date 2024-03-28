import styled from "styled-components";
import CutSelect from "../components/writting/Cutselect";
import Header from "../components/common/Header";

const CutSelectPage = () => {
  return (
    <div className="wrap">
      <Header />
      <CutSelectWrap>
        <CutSelect />
      </CutSelectWrap>
    </div>
  );
};

export default CutSelectPage;

const CutSelectWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 85%;
`;
