import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles"; //전역 스타일
import Main from "./pages/Main";
import Character from "./pages/Character";
import CharacterSelection from "./pages/CharacterSelection";
import CompleteDiary from "./pages/CompleteDiary";
import MyPage from "./pages/MyPage";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}
        <Route path="/character" element={<Character />} /> {/* 캐릭터 설정 */}
        <Route path="/character/selection" element={<CharacterSelection />} />
        <Route path="/haru4cut" element={<CompleteDiary />} />
        {/* 일기 완성 */}
      </Routes>
    </div>
  );
}

export default App;
