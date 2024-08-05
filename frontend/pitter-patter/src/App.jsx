import React from 'react';
import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/Game/GamePage';
import GamePageMulti from './pages/Game/GamePageMulti';
import SelectMode from './pages/Game/SelectMode';
import Snapshot from './pages/Game/Snapshot/Snapshot';
import SnapshotResult from './pages/Game/Snapshot/SnapshotResult';
import Shop from './pages/Shop/Shop';
import SnapshotShop from './pages/Shop/SnapshotShop';
import WallpaperShop from './pages/Shop/WallpaperShop';
import Attendance from './pages/ETC/Attendance/Attendance';
import CalendarPage from './pages/ETC/Attendance/CalendarPage';
import Rank from './pages/ETC/Rank/Rank';
import ChildPage from './pages/Child/ChildPage';
import Error from './pages/Error';
import Login from './pages/User/Auth/Login';
import SignUp from './pages/User/Auth/SignUp';
import SelectProfile from './pages/User/SelectProfile';
import MyPage from './pages/User/MyPage/MyPage';
import SFA from './pages/User/SFA/SFA';
import ChangePassword from './pages/User/MyPage/ChangePassword';
import DeleteUser from './pages/User/MyPage/DeleteUser';
import ResetPassword from './pages/User/Auth/ResetPassword';
import ResetSFA from './pages/User/Auth/ResetSFA';
import NewSFA from './pages/User/SFA/NewSFA';
import SFAChild from './pages/User/SFA/SFAChild';
import ChildMyPage from './pages/User/MyPage/ChildMyPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/game" element={<GamePage />} />
        <Route path="/game/multi" element={<GamePageMulti />} />
        <Route path="/game/select-mode" element={<SelectMode />} />
        <Route path="/game/snapshot" element={<Snapshot />} />
        <Route path="/game/snapshot/result" element={<SnapshotResult />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/snapshot" element={<SnapshotShop />} />
        <Route path="/shop/wallpaper" element={<WallpaperShop />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/rank" element={<Rank />} />

        <Route path="/child/*" element={<ChildPage />} />
        <Route path='/child/mypage' element={<ChildMyPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/reset-sfa' element={<ResetSFA />} />
        <Route path="/select-profile" element={<SelectProfile />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/change-password" element={<ChangePassword />} />
        <Route path="/mypage/delete-user" element={<DeleteUser />} />
        <Route path="/sfa" element={<SFA />} />
        <Route path="/sfa-child" element={<SFAChild />}></Route>
        <Route path='/newsfa' element={<NewSFA />} />
        
        <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
