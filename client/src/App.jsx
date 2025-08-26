import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return (
    <div className="root">
      <BrowserRouter>
        <div className="overlay">
          <TopBar />
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
