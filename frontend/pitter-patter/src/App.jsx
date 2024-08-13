import React from 'react';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import ResetPassword from './pages/User/Auth/ResetPassword';
import ResetSFA from './pages/User/Auth/ResetSFA';
import NewSFA from './pages/User/SFA/NewSFA';
import SFAChild from './pages/User/SFA/SFAChild';
import ChildMyPage from './pages/User/MyPage/ChildMyPage';
import Expired from "./pages/Expired";
import ForgotPassword from './pages/User/Auth/ForgotPassword';
import ProtectedRoute from './ProtectedRoute'; // 추가된 컴포넌트 임포트
import DeleteUser from './pages/User/MyPage/DeleteUser';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/game" element={<ProtectedRoute element={GamePage} />} />
          <Route path="/game/multi" element={<ProtectedRoute element={GamePageMulti} />} />
          <Route path="/game/select-mode" element={<ProtectedRoute element={SelectMode} />} />
          <Route path="/game/snapshot" element={<ProtectedRoute element={Snapshot} />} />
          <Route path="/game/snapshot/result" element={<ProtectedRoute element={SnapshotResult} />} />

          <Route path="/shop" element={<ProtectedRoute element={Shop} />} />
          <Route path="/shop/snapshot" element={<ProtectedRoute element={SnapshotShop} />} />
          <Route path="/shop/wallpaper" element={<ProtectedRoute element={WallpaperShop} />} />

          <Route path="/attendance" element={<ProtectedRoute element={Attendance} />} />
          <Route path="/calendar" element={<ProtectedRoute element={CalendarPage} />} />
          <Route path="/rank" element={<ProtectedRoute element={Rank} />} />

          <Route path="/child/*" element={<ProtectedRoute element={ChildPage} />} />
          <Route path='/child/mypage' element={<ProtectedRoute element={ChildMyPage} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/reset-sfa' element={<ResetSFA />} />
          <Route path="/select-profile" element={<ProtectedRoute element={SelectProfile} />} />
          <Route path="/mypage" element={<ProtectedRoute element={MyPage} />} />
          <Route path="/mypage/change-password" element={<ProtectedRoute element={ChangePassword} />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/sfa" element={<ProtectedRoute element={SFA} />} />
          <Route path="/sfa-child" element={<ProtectedRoute element={SFAChild} />} />
          <Route path='/newsfa' element={<ProtectedRoute element={NewSFA} />} />
          <Route path='/expired' element={<Expired />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
