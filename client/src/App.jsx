import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext"; 

import TopBar from "./components/common/TopBar";
import Login from "./Pages/Login.jsx";
import Feed from "./Pages/Feed";
import Upload from "./Pages/Upload";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import BottomNav from "./components/common/BottomNav";
import Weather from "./Pages/Weather.jsx";
import MyPages from "./Pages/myPage.jsx";

// AppLayout
function AppLayout({ notifications, markAsRead, markAllAsRead }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth(); 

  // 로그인 페이지에서는 TopBar / BottomNav 숨김
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="overlay">
      {!isLoginPage && <TopBar notifications={notifications} />}
      <div className="content">
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/" element={<Weather />} />
          <Route
            path="/feed"
            element={isLoggedIn ? <Feed /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/upload"
            element={isLoggedIn ? <Upload /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/mypage"
            element={isLoggedIn ? <MyPages /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/notifications"
            element={
              isLoggedIn ? (
                <Notifications
                  notifications={notifications}
                  markAsRead={markAsRead}
                  markAllAsRead={markAllAsRead}
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate replace to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isLoginPage && <BottomNav />}
    </div>
  );
}

function AppContent() {
  const { login } = useAuth();
  const location = useLocation();

  // OAuth 리디렉션 처리
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      login(tokenFromUrl);
      // URL에서 토큰을 제거하여 주소창을 정리
      window.history.replaceState({}, document.title, "/");
    }
  }, [location, login]);

  // 알림 더미 데이터 (기존 App 컴포넌트에서 이동)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      content: "좋아요가 추가되었습니다.",
      time: "2분 전",
      unread: true,
      thumbnail: "/images/sample1.jpg",
    },
    {
      id: 2,
      type: "weather",
      content: "오후에 비 소식이 있어요.",
      time: "1시간 전",
      unread: true,
    },
    {
      id: 3,
      type: "weather",
      content: "오늘은 미세먼지가 나쁨입니다.",
      time: "어제",
      unread: false,
    },
  ]);

  // 알림 읽음 처리 함수
  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  return (
    <AppLayout
      notifications={notifications}
      markAsRead={markAsRead}
      markAllAsRead={markAllAsRead}
    />
  );
}


function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
