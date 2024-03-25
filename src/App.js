import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles"; //전역 스타일
import Main from "./pages/Main";
import Character from "./pages/Character";
import CharacterSelection from "./pages/CharacterSelection";
import CompleteDiary from "./pages/CompleteDiary";
import CutSelectPage from "./pages/CutSelectPage";
import DateSelectPage from "./pages/DateSelectPage";
import KeywordInputPage from "./pages/KeywordInputPage";
import MyPage from "./pages/MyPage";

import LoginPage from "./pages/LoginPage";
import SubmitLoadingPage from "./pages/SubmitLoading";
import OnboardingPage from "./pages/OnboardingPage";

import Calendar from "./pages/CalendarPage";
import Haru4CutDetail from "./pages/Haru4CutDetail";
import Share from "./pages/Share";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<OnboardingPage />} /> {/* 메인 페이지 */}
        <Route path="/home" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}
        <Route path="/login" element={<LoginPage />} /> {/* 마이 페이지 */}
        <Route path="/calendar" element={<Calendar />} /> {/* 캘린더 페이지 */}
        <Route path="/haru4cut/:diaryid" element={<Haru4CutDetail />} />
        {/* 일기 상세보기 페이지 */}
        <Route path="/haru4cut/:diaryid/share" element={<Share />} />
        {/* 일기 공유 페이지 */}
        <Route path="/character" element={<Character />} /> {/* 캐릭터 설정 */}
        <Route path="/character/selection" element={<CharacterSelection />} />
        <Route path="/writting/frame" element={<CutSelectPage />} />
        <Route path="/writting/date" element={<DateSelectPage />} />
        <Route path="/writting/keyword" element={<KeywordInputPage />} />
        <Route path="/loading" element={<SubmitLoadingPage />} />
        <Route path="/haru4cut" element={<CompleteDiary />} />
        {/* 일기 완성 */}
      </Routes>
    </div>
  );
}

export default App;
