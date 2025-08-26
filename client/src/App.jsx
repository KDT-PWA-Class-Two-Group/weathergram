import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./Pages/Weather";
import Feed from "./Pages/Feed";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import Upload from "./Pages/Upload";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <div style={{ paddingBottom: 60, minHeight: 'calc(100vh - 56px)' }}>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;