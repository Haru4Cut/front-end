import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Button from "../components/common/Button";
import HomeIcon from "../assets/images/HomeIcon.svg";
import DownloadIcon from "../assets/images/DownloadIcon.svg";
import InstaLogo from "../assets/images/InstaLogo.svg";
import html2canvas from "html2canvas";
import testImage4 from "../assets/images/testimage4.png";
import { ReactComponent as FavoriteIcon } from "../assets/images/FavoriteIcon.svg";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import axios from "axios";
export const share = (dataurl, imgName) => {
  // url -> file 변경하는 코드
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], imgName, { type: mime });

  if (navigator.share) {
    navigator.share({
      title: "제목",
      text: "공유 내용",
      files: [file],
    });
  } else {
    alert("공유하기가 지원되지 않는 환경 입니다.");
  }
};

export default function Share() {
  const { diaryid } = useParams(); // 현재 diaryId
  const DiaryImgList = [testImage4, testImage4, testImage4, testImage4];
  // 오늘 날짜
  var date = new window.Date();
  const [heartStates, setHeartStates] = useState(Array(4).fill(true));
  const Text =
    "오늘은 내 20살 생일이었다! 오전에 친구들과 클라이밍을 하고 생일파티를 했다-! 친구들이 생일 선물을 많이 줘서 기쁜 하루였다. 저녁에 아빠가 케이크를 사와서 가족들끼리 케이크도 먹었다! 행복한 생일~";

  const onClickShareButton = () => {
    // 이미지를 Canvas로 변환하여 데이터 URL로 저장
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
      const dataUrl = canvas.toDataURL("image/png");
      // 파일 이름 지정
      const fileName = "haru4cut.png";
      // 공유 함수 호출
      share(dataUrl, fileName);
    });
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
  const [diaries, setDiaries] = useState([]); // 해당 날짜의 일기 데이터
  // 현재 diaryid의 일기 가져오기
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(`/diaries/${diaryid}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        console.log(`/diaries/${diaryid}`, response);
        setDiaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaries();
  }, []);
  // 좋아요
  const onClickHeart = (index) => {
    setHeartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
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
          <Date>{diaries.date}</Date>
          <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
          <ImgWrap>
            {/* cutNum 1일 때 */}
            {diaries.cutNum === 1 && (
              <>
                <DiaryImage1 src={diaries.imgLink[0]} alt="하루네컷 이미지" />
                <StyledFavoriteIcon1
                  onClick={() => onClickHeart(0)}
                  fill={heartStates[0] ? "#E54B4B" : "#C7C7C7"}
                  alt="heart icon"
                />
              </>
            )}
            {/* cutNum 2일 때 */}
            {diaries.cutNum === 2 && (
              <>
                {diaries.imgLink.map((imgUrl, index) => (
                  <>
                    <DiaryImage2
                      src={imgUrl}
                      alt="하루네컷 이미지"
                      key={index}
                    />
                    <StyledFavoriteIcon2
                      onClick={() => onClickHeart(index)}
                      fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                      alt="heart icon"
                    />
                  </>
                ))}
              </>
            )}
            {/* cutNum 4일 때 */}
            {diaries.cutNum === 4 && (
              <>
                {diaries.imgLink.map((imgUrl, index) => (
                  <>
                    <DiaryImage
                      src={imgUrl}
                      alt="하루네컷 이미지"
                      key={index}
                    />
                    <StyledFavoriteIcon
                      onClick={() => onClickHeart(index)}
                      fill={heartStates[index] ? "#E54B4B" : "#C7C7C7"}
                      alt="heart icon"
                    />
                  </>
                ))}
              </>
            )}
          </ImgWrap>
          <TextWrap>{diaries.text}</TextWrap>
        </TodaysDiaryWrap>
      </DownWrap>
      <div>오늘의 하루네컷을 완성했어요!</div>
      <DownloadButtonWrap>
        <Button width="143px" onClick={onClickShareButton}>
          <Icon src={InstaLogo} />
          공유하기
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
// 4컷일 때 하트 아이콘
const StyledFavoriteIcon = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 115px;
  left: -21px;
  cursor: pointer;
`;
// 1컷일 때 하트 아이콘
const StyledFavoriteIcon1 = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 315px;
  left: -30px;
  cursor: pointer;
`;
// 2컷일 때 하트 아이콘
const StyledFavoriteIcon2 = styled(FavoriteIcon)`
  width: 24px;
  height: 24px;
  position: relative;
  top: 120px;
  left: -30px;
  cursor: pointer;
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
