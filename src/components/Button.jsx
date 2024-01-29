import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(Link)`
  width: 290px;
  height: 45px;
  background-color: ${(props) => props.backgroundColor || "#5370d4"};
  color: ${(props) => props.textColor || "white"};
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`;
