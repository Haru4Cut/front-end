import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompleteImg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageData = location.state?.imageData;
  const { imgLinks, date } = location.state;
  if (!imageData) {
    return <div>이미지 정보가 없습니다.</div>;
  }

  return (
    <div>
      <h1>생성된 이미지</h1>
      {/* 예를 들어 이미지 데이터 중 'url' 속성 사용 */}
      {console.log(imageData)}
      <img src={imageData.imgLinks} alt="생성된 이미지" />
    </div>
  );
};

export default CompleteImg;
