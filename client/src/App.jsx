import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./Pages/Weather";
<<<<<<< HEAD
import Login from "./Pages/login";

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Login/>
      <Weather />
=======
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
>>>>>>> 0de35b9298704f81309277c62b6a2d15cf00bef0
    </div>
  );
}

export default App;
