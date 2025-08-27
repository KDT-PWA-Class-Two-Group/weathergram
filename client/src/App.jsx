import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/common/TopBar";
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";
import Upload from "./Pages/Upload";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import BottomNav from "./components/common/BottomNav";
import Weather from "./Pages/Weather.jsx";
import MyPages from "./Pages/myPage.jsx";

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <div className="overlay">
          <TopBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Weather />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mypage" element={<MyPages />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
