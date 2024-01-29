import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles"; //전역 스타일
import Onboading from "./pages/Onboading";
import Character from "./pages/Character";
import CharacterSelection from "./pages/CharacterSelection";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboading />} /> {/* 온보딩 */}
        <Route path="/character" element={<Character />} /> {/* 캐릭터 설정 */}
        <Route
          path="/character/selection"
          element={<CharacterSelection />}
        />{" "}
      </Routes>
    </div>
  );
}

export default App;
