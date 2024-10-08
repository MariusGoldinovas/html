import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home-page/Home";
import Header from "./components/header/Header";
import AddUser from "./pages/add-user/AddUser";
import Login from "./pages/login/Login";
import Upload from "./pages/upload/Upload";
import VideoPlayer from "./pages/video-player/VideoPlayer";
import SearchResults from "./pages/search-results/SearchResults";
import Admin from "./pages/admin/Admin";
import EditVideo from "./components/edit-video/EditVideo";
import EditUser from "./components/edit-user/EditUser";
import Channel from "./pages/channel/Channel";
import Logout from "./pages/logout/Logout";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video-player/:id" element={<VideoPlayer />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit-video/:id" element={<EditVideo />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
