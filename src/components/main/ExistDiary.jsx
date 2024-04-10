import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Exist({diaryId, diaryImgList}) {

  return (
    <ExistDiaryWrap>
      <ImgWrap>
        {diaryImgList.map((imgUrl, index) => (
          <DiaryImage src={imgUrl} alt="하루네컷 이미지" />
        ))}
      </ImgWrap>
      <DiaryButton>자세히 보기</DiaryButton>
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

const DiaryImage = styled.img`
  width: 108px;
  margin: 3px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  margin: 20px 0px;
`;
