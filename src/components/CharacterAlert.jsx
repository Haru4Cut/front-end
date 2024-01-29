import React from "react";
import styled from "styled-components";

export default function CharacterAlert() {
  return (
    <Alertext>
      캐릭터는 참고를 위한 이미지이며 {"\n"} 생성될 캐릭터와는 무관합니다 :)
    </Alertext>
  );
}

const Alertext = styled.div`
  color: #9c9c9c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
`;
