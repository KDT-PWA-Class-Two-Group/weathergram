import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";
import Weather from "./Pages/Weather";
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";
import Upload from "./Pages/Upload";
import MyPage from "./Pages/MyPage";

import NotFound from "./Pages/NotFound";

import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";



function App() {
  // 예시 알림 데이터 
  const [notifications, setNotifications] = useState([
    { id: 1, type: "like", content: "좋아요가 추가되었습니다.", time: "2분 전", unread: true, thumbnail: "/images/sample1.jpg" },
    { id: 2, type: "weather", content: "오후에 비 소식이 있어요.", time: "1시간 전", unread: true },
    { id: 3, type: "weather", content: "오늘은 미세먼지가 나쁨입니다.", time: "어제", unread: false },
  ]);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));


  return (
    <div className="root">
      <BrowserRouter>
        <div className="overlay">
          <TopBar notifications={notifications} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Weather />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/notifications" element={<Notifications notifications={notifications} markAsRead={markAsRead} markAllAsRead={markAllAsRead} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
