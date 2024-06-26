import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(Link)`
  width: ${(props) => props.width || "290px"};
  height: ${(props) => props.height || "45px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-top: ${(props) => props.marginTop || "0px"};
  background-color: ${(props) => props.backgroundColor || "#5370d4"};
  color: ${(props) => props.textColor || "white"};
  padding: ${(props) => props.padding};
  font-size: 15px;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  position: relative;
`;
