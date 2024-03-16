import styled from "styled-components";
import Header from "../components/common/Header";
import DateSelect from "../components/writting/DateSelect";
import { useLocation } from "react-router-dom";
const DateSelectPage = () => {
  // const location = useLocation();
  // const cutNum = location.state && location.state.cutNum;
  return (
    <div className="wrap">
      <Header />
      <DateSelectWrap>
        <div>
          <DateSelect />

          <div>
            {" "}
            {/* cutNum이 존재할 경우에만 출력합니다. */}
            {/* {cutNum && <p>Cut Number: {cutNum}</p>} */}
          </div>
        </div>
      </DateSelectWrap>
    </div>
  );
};

export default DateSelectPage;

const DateSelectWrap = styled.div`
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
