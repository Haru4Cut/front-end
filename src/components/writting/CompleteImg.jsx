import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CompleteImg = () => {
  const location = useLocation();
  const { responseData } = location.state;
  console.log("CompleteImg:", responseData);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // responseData에서 이미지 데이터 추출
    if (responseData && responseData.imgLinks) {
      // 이미지 데이터를 저장할 배열
      const imageDataArray = [];

      // responseData의 imgLinks 배열을 순회하면서 이미지 번호와 이미지 링크를 추출하여 배열에 저장
      responseData.imgLinks.forEach((link) => {
        // link 문자열을 ":" 기준으로 분할하여 이미지 번호와 이미지 링크를 추출
        const [number, url] = link.split(" : ");
        console.log("통과", url);
        // 추출한 이미지 데이터를 imageDataArray 배열에 추가
        imageDataArray.push({ number: number.trim(), url: url.trim() });
      });

      // 이미지 데이터 배열을 상태 변수에 저장
      setImageData(imageDataArray);
    }
  }, [responseData]);
  console.log("imageData", imageData);
  console.log("imageData[0]", imageData.url);
  return (
    <div>
      <h1>생성된 이미지</h1>

      {/* 이미지 표시 */}
      {imageData.map((data) => (
        <div key={data.number}>
          <p>이미지 번호: {data.number}</p>
          {/* 이미지가 있는 경우에만 이미지를 표시 */}
          {data.url && <img src={data.url} alt={`이미지 ${data.number}`} />}
        </div>
      ))}
    </div>
  );
};

export default CompleteImg;
