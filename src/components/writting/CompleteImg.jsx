import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as FavoriteIcon } from "../../assets/images/FavoriteIcon.svg";

const CompleteImg = () => {
  const location = useLocation();
  const { responseData } = location.state;
  console.log("CompleteImg:", responseData);

  const [diaries, setDiaries] = useState([]); // 해당 날짜의 일기 데이터

  useEffect(() => {
    if (responseData && responseData.imgLinks) {
      const imageDataArray = responseData.imgLinks.map((link) => {
        const [number, url] = link.split(" : ");
        return { number: number.trim(), url: url.trim() };
      });
      setDiaries(imageDataArray);
    }
  }, [responseData]);

  return (
    <MainWrap>
      <TodaysDiaryWrap>
        <Todays4CutDiary>생성된 이미지</Todays4CutDiary>
        <ImgWrap>
          {/* cutNum 1일 때 */}
          {diaries.imgLinks.length === 1 && (
            <>
              <DiaryImage1 src={diaries.imgLinks[0]} alt="하루네컷 이미지" />
            </>
          )}
          {/* cutNum 2일 때 */}
          {diaries.imgLinks.length === 2 && (
            <>
              {diaries.imgLinks.map((imgUrl, index) => (
                <>
                  <DiaryImage2 src={imgUrl} alt="하루네컷 이미지" key={index} />
                </>
              ))}
            </>
          )}
          {/* cutNum 4일 때 */}
          {diaries.imgLinks.length === 4 && (
            <>
              {diaries.imgLinks.map((imgUrl, index) => (
                <>
                  <DiaryImage src={imgUrl} alt="하루네컷 이미지" key={index} />
                </>
              ))}
            </>
          )}
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

// 4컷일 때 다이어리 이미지
const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
`;
// 1컷일 때 다이어리 이미지
const DiaryImage1 = styled.img`
  width: 200px;
`;
// 2컷일 때 다이어리 이미지
const DiaryImage2 = styled.img`
  width: 250px;
  margin: 5px 0px;
`;
