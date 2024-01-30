import React from "react";
import styled from "styled-components";
import HairStyle from "./HairStyle.jsx";
import HairColor from "./HairColor.jsx";
export default function HairSelection() {
  return (
    <>
      <SelectionBox marginBottom="0px">
        <HairStyle />
      </SelectionBox>
      <SelectionBox height="140px" marginTop="11px">
        <HairColor />
      </SelectionBox>
    </>
  );
}

const SelectionBox = styled.div`
  width: 280px;
  height: ${(props) => props.height || "275px"};
  background-color: white;
  border-radius: 50px;
  margin-top: ${(props) => props.marginTop || "36px"};
  margin-bottom: ${(props) => props.marginBottom || "38px"};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
