import { createGlobalStyle } from "styled-components";
import Pretendard from "./assets/fonts/Pretendard-Regular.woff";
import PoetsenOne from "./assets/fonts/PoetsenOne-Regular.ttf";
import KotraHope from "./assets/fonts/KOTRAHOPE.ttf";
const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: "Pretendard";
  src: url(${Pretendard}) format("woff");
}
@font-face {
  font-family: "PoetsenOne";
  font-weight: normal;
  src: url(${PoetsenOne}) format("truetype");
}
@font-face {
  font-family: "PoetsenOne";
  font-weight: normal;
  src: url(${PoetsenOne}) format("truetype");
}

@font-face {
  font-family: "KotraHope";
  font-weight: normal;
  src: url(${KotraHope}) format("truetype");
}

body {
    font-family: 'Pretendard';
    margin: 0;
    font-size: 16px;
}

`;

export default GlobalStyle;
