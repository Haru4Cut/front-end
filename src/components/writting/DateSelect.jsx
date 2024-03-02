import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../store";
const DateSelect = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const formatDate = (year, month, day) => {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  // const [date, setDate] = useState(
  //   formatDate(selectedYear, selectedMonth, selectedDay)
  // );

  useEffect(() => {
    const formattedDate = formatDate(selectedYear, selectedMonth, selectedDay);
    dispatch(setDate(formattedDate));
    console.log(formattedDate);
  }, [selectedYear, selectedMonth, selectedDay]);
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value));
  };

  const handleDateSubmit = () => {
    console.log("Selected Date:", date); // Redux 상태에서 선택된 날짜 정보를 가져옵니다
  };

  return (
    <div>
      <DateSelectWrap>
        <div>날짜 정보 선택하기</div>
        <h1>날짜를 입력하세요</h1>
        <DateContainer>
          <Select value={selectedYear} onChange={handleYearChange}>
            {Array.from(
              { length: 100 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select value={selectedDay} onChange={handleDayChange}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </DateContainer>
        <SubmitButton
          to="/writting/keyword"
          onClick={() => {
            handleDateSubmit();
            console.log(date);
          }}
        >
          일기 쓰러 가기
        </SubmitButton>
      </DateSelectWrap>
    </div>
  );
};

export default DateSelect;

const SubmitButton = styled(Link)`
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

const DateContainer = styled.div`
  //sbackground-color: pink;
  width: 75vw; /* 프레임의 초기 너비 설정 */
  height: 30vh; /* 프레임의 초기 높이 설정 */
  margin-top: 5vh;
  margin-bottom: 5vh;
  overflow: hidden; /* 프레임을 넘는 컨텐츠 숨김 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 5px;
  font-size: 1.5rem;
  width: 20vw;
  height: 6vh;
`;

const DateSelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
