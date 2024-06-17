import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles"; //전역 스타일
import Main from "./pages/Main";
import Character from "./pages/Character";
import Profile from "./pages/Profile";

import CharacterSelection from "./pages/CharacterSelection";
import CompeleteDiary from "./pages/CompleteDiary";
import CutSelectPage from "./pages/CutSelectPage";
import DateSelectPage from "./pages/DateSelectPage";
import KeywordInputPage from "./pages/KeywordInputPage";
import MyPage from "./pages/MyPage";

import KakaoLogin from "./components/login/SocialKakao";
import SubmitLoadingPage from "./pages/SubmitLoading";
import OnboardingPage from "./pages/OnboardingPage";

import Calendar from "./pages/CalendarPage";
import Haru4CutDetail from "./pages/Haru4CutDetail";
import Share from "./pages/Share";
import Redirection from "./components/login/Redirect";
import CompleteImg from "./components/writting/CompleteImg";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<OnboardingPage />} /> {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}
        <Route path="/login" element={<KakaoLogin />} /> {/* 마이 페이지 */}
        <Route path="/payment" element={<PaymentPage />} /> {/* 결제 페이지 */}
        <Route
          path="/login/oauth2/code/kakao"
          element={<Redirection />}
        ></Route>
        <Route path="/calendar" element={<Calendar />} /> {/* 캘린더 페이지 */}
        <Route path="/haru4cut/:diaryid" element={<Haru4CutDetail />} />
        <Route path="/haru4cut/:diaryid/share" element={<Share />} />
        {/* 일기 상세보기 페이지 */}
        <Route path="/diaries/:userId/events" element={<CompleteImg />} />
        {/* 일기 공유 페이지 */}
        <Route path="/character" element={<Character />} /> {/* 캐릭터 설정 */}
        <Route path="/character/profile" element={<Profile />} />
        {/* 캐릭터 설정_프로필 설정 */}
        <Route path="/character/selection" element={<CharacterSelection />} />
        <Route path="/writting/frame" element={<CutSelectPage />} />
        <Route path="/writting/date" element={<DateSelectPage />} />
        <Route path="/writting/keyword" element={<KeywordInputPage />} />
        <Route path="/loading" element={<SubmitLoadingPage />} />
        <Route path="/createdImg" element={<CompleteImg />} />
        <Route path="/haru4cut" element={<CompeleteDiary />} />
        {/* 일기 완성 */}
      </Routes>
    </div>
  );
}

export default App;
