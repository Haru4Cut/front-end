import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as FavoriteIcon } from "../../assets/images/FavoriteIcon.svg";

const CompleteImg = () => {
  const location = useLocation();
  const { responseData } = location.state;
  console.log("CompleteImg:", responseData);
  const [imageData, setImageData] = useState([]);
  const [heartStates, setHeartStates] = useState([]);

  useEffect(() => {
    if (responseData && responseData.imgLinks) {
      const imageDataArray = responseData.imgLinks.map((link) => {
        const [number, url] = link.split(" : ");
        return { number: number.trim(), url: url.trim() };
      });
      setImageData(imageDataArray);
      setHeartStates(Array(imageDataArray.length).fill(true));
    }
  }, [responseData]);

  const onClickHeart = (index) => {
    setHeartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <MainWrap>
      <TodaysDiaryWrap>
        <Todays4CutDiary>생성된 이미지</Todays4CutDiary>
        <ImgWrap>
          {imageData.map((data, index) => (
            <div key={data.number}>
              <DiaryImage src={data.url} alt={`이미지 ${data.number}`} />
              <StyledFavoriteIcon
                onClick={() => onClickHeart(index)}
                fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                alt="heart icon"
              />
            </div>
          ))}
        </ImgWrap>
      </TodaysDiaryWrap>
    </MainWrap>
  );
};

export default CompleteImg;

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;

const TodaysDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 90%;
  margin-bottom: 20px;
`;

const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 28px;
  margin-top: 10px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  margin: 20px 0px 20px 20px;
`;

const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: -30px;
  left: 50px;
  cursor: pointer;
`;
