import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Pages/Feed";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import Upload from "./Pages/Upload";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";
import Weather from './Pages/Weather.jsx';
import MyPage from './Pages/myPage.jsx'

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
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;