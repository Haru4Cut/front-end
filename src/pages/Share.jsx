import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Button from "../components/common/Button";
import HomeIcon from "../assets/images/HomeIcon.svg";
import DownloadIcon from "../assets/images/DownloadIcon.svg";
import InstaLogo from "../assets/images/InstaLogo.svg";
import html2canvas from "html2canvas";
import testImage4 from "../assets/images/testimage4.png";
import { saveAs } from "file-saver";

export default function Share() {
  const DiaryImgList = [testImage4, testImage4, testImage4, testImage4];
  // 오늘 날짜
  var date = new window.Date();

  const Text =
    "오늘은 내 20살 생일이었다! 오전에 친구들과 클라이밍을 하고 생일파티를 했다-! 친구들이 생일 선물을 많이 줘서 기쁜 하루였다. 저녁에 아빠가 케이크를 사와서 가족들끼리 케이크도 먹었다! 행복한 생일~";

  const onClickShareButton = () => {
    console.log("onClcickShareButton");
  };
  const onClickDownloadButton = () => {
    const target = document.getElementById("download");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    html2canvas(target, {
      logging: true,
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "haru4cut.png");
        }
      });
    });
  };
  return (
    <MainWrap>
      <DownWrap id="download">
        <LogoWrap>
          <Logo>Haru4cut</Logo>
          <LogoUnderLine />
          <div>내 하루를 네컷으로 기록하세요</div>
        </LogoWrap>

        <TodaysDiaryWrap>
          <Date>{moment(date).format("YY.MM.DD")}</Date>
          <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
          <ImgWrap>
            {DiaryImgList.map((imgUrl, index) => (
              <>
                <DiaryImage src={imgUrl} alt="하루네컷 이미지" />
              </>
            ))}
          </ImgWrap>
          <TextWrap>{Text}</TextWrap>
        </TodaysDiaryWrap>
      </DownWrap>
      <div>오늘의 하루네컷을 완성했어요!</div>
      <DownloadButtonWrap>
        <Button width="143px" onClick={onClickShareButton}>
          <Icon src={InstaLogo} />
          인스타 공유
        </Button>
        <Button width="143px" onClick={onClickDownloadButton}>
          <Icon src={DownloadIcon} />
          앨범에 저장
        </Button>
      </DownloadButtonWrap>
      <Button backgroundColor="#9D9D9D" marginBottom="20px" to="/">
        <Icon src={HomeIcon} marginBottom="3px" />
        홈으로 돌아가기
      </Button>
    </MainWrap>
  );
}
const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: #8c8c8c;
  font-size: 14px;
`;
const DownWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #9cbedd;
  font-size: 20px;
  font-family: "KotraHope";
  margin-bottom: 20px;
`;
const Logo = styled.div`
  font-family: "PoetsenOne";
  color: #9cbedd;
  font-size: 42px;
  z-index: 10;
  position: relative;
  top: 12px;
`;

const LogoUnderLine = styled.div`
  width: 200px;
  height: 10px;
  border-radius: 30px;
  background-color: #daebfa;
  z-index: -1;
  margin-bottom: 7px;
`;
const TodaysDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  width: 85%;
  height: 80%;
  margin-bottom: 20px;
  background-color: #a8c9e7;
`;
const Date = styled.div`
  font-size: 17px;
  color: #e5f0fa;
  font-weight: 600;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: white;
  font-size: 29px;
  margin: 7px 0px 15px 0px;
`;
const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 280px;
  background-color: #f3f8fc;
  border-radius: 10px;
  padding: 10px 0px;
`;
const TextWrap = styled.div`
  font-family: "KotraHope";
  color: white;
  font-size: 18px;
  width: 250px;
  margin-top: 25px;
  text-decoration: underline;
  text-underline-offset: 6px;
  line-height: 175%;
`;
const DownloadButtonWrap = styled.div`
  display: flex;
  width: 290px;
  justify-content: space-between;
  margin: 16px 0px 6px 0px;
`;
const Icon = styled.img`
  margin-right: 4px;
  margin-bottom: ${(props) => props.marginBottom || "0px"};
`;
