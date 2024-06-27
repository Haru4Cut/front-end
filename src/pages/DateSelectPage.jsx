import styled from "styled-components";
import Header from "../components/common/Header";
import DateSelect from "../components/writting/DateSelect";

const DateSelectPage = () => {
  // const location = useLocation();
  // const cutNum = location.state && location.state.cutNum;
  console.log("DateSelectPage");
  return (
    <div className="wrap">
      <Header />
      <DateSelectWrap>
        <div>
          <DateSelect />
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
  height: 80%;
`;
