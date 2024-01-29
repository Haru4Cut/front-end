import React from "react";
import styled from "styled-components";

export default function SkinSelection() {
  return (
    <>
      <TitleText>피부색은 어떤가요?</TitleText>
    </>
  );
}

const TitleText = styled.div`
  color: #272727;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;
