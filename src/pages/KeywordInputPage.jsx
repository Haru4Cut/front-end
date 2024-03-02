import styled from "styled-components";
import Header from "../components/common/Header";
import KeywordInput from "../components/writting/KeywordInput";

const KeywordInputPage = () => {
  return (
    <div className="wrap">
      <Header />
      <KeywordInputWrap>
        <div>
          <KeywordInput />
        </div>
      </KeywordInputWrap>
    </div>
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
  height: 85%;
  padding-top: 15px;
`;

