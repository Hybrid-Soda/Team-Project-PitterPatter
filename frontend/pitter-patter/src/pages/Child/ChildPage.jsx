import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Header from "../LandingPage/Header";
import ChildActivityTable from './ChildActivityTable';
import ChildPhysicalInfo from './ChildPhysicalInfo';
import BMIGraph from './BMIGraph';
import { Body, ChildBody, ChildBackground, ContextBackground, ContextItem, ChildMenu, ChildMenuItem, Backspace } from './ChildPageStyle';
import Backarrow from "/src/assets/icons/backArrow.png";

function ChildPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuFromPath = (path) => {
    switch (path) {
      case '/child/physical-info':
        return '신체 정보 입력하기';
      case '/child/activity-table':
        return '활동량 분석표 보기';
      case '/child/bmi-graph':
        return 'BMI 분석표 보기';
      default:
        return '신체 정보 입력하기';
    }
  };

  const [activeMenu, setActiveMenu] = useState(getMenuFromPath(location.pathname));

  useEffect(() => {
    const path = activeMenu === '신체 정보 입력하기' ? '/child/physical-info'
                : activeMenu === '활동량 분석표 보기' ? '/child/activity-table'
                : '/child/bmi-graph';
    navigate(path);
  }, [activeMenu, navigate]);

  return (
    <Body>
      <Header />
      <ChildBody>
        <ChildBackground>
          <ChildMenu>
            <Backspace to="/">
              <img src={Backarrow} alt="" />
            </Backspace>
            <ChildMenuItem $isActive={activeMenu === '신체 정보 입력하기'} onClick={() => setActiveMenu('신체 정보 입력하기')}>
              신체 정보 입력하기
            </ChildMenuItem>
            <ChildMenuItem $isActive={activeMenu === '활동량 분석표 보기'} onClick={() => setActiveMenu('활동량 분석표 보기')}>
              활동량 분석표 보기
            </ChildMenuItem>
            <ChildMenuItem $isActive={activeMenu === 'BMI 분석표 보기'} onClick={() => setActiveMenu('BMI 분석표 보기')}>
              BMI 분석표 보기
            </ChildMenuItem>
          </ChildMenu>
          <ContextBackground>
            <ContextItem>
              <Routes>
                <Route path="physical-info" element={<ChildPhysicalInfo />} />
                <Route path="activity-table" element={<ChildActivityTable />} />
                <Route path="bmi-graph" element={<BMIGraph />} />
              </Routes>
            </ContextItem>
          </ContextBackground>
        </ChildBackground>
      </ChildBody>
    </Body>
  );
}

export default ChildPage;
