import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ExistDiary({ data }) {
  console.log("data", data);
  const imgLinks = data.imgLinks || [];
  return (
    <ExistDiaryWrap>
      <ImgWrap>
        {imgLinks.length === 1 && (
          <>
            {imgLinks.map((imgUrl, index) => (
              <>
                <DiaryImage1 src={imgUrl} alt="하루네컷 이미지" />
              </>
            ))}
          </>
        )}
        {imgLinks.length === 2 && (
          <>
            {imgLinks.map((imgUrl, index) => (
              <>
                <DiaryImage2 src={imgUrl} alt="하루네컷 이미지" />
              </>
            ))}
          </>
        )}
        {imgLinks.length === 4 && (
          <>
            {imgLinks.map((imgUrl, index) => (
              <>
                <DiaryImage4 src={imgUrl} alt="하루네컷 이미지" />
              </>
            ))}
          </>
        )}
      </ImgWrap>
      <DiaryButton to={`/haru4cut/${data.diaryId}`}>자세히 보기</DiaryButton>
    </ExistDiaryWrap>
  );
}

const ExistDiaryWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DiaryButton = styled(Link)`
  width: 95px;
  text-align: center;
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
const DiaryImage1 = styled.img`
  margin: 5px;
  width: 120px;
`;

const DiaryImage2 = styled.img`
  margin: 5px;
  width: 180px;
`;

const DiaryImage4 = styled.img`
  margin: 5px;
  width: 100px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  margin: 20px 0px;
`;
