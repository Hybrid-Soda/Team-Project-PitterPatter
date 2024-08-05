import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutBase,
  LayoutMyPage,
  MenuWrap,
  MenuIcon,
  MenuItemWrap,
  MenuItem,
  MainWrap,
} from './MyPageStyle';
import ArrowLeft from "../../../assets/icons/ArrowLeft.png";
import ChildInfo from './ChildInfo';

function ChildMyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [activeComponent, setActiveComponent] = useState('userInfo');
  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const Navigate = useNavigate();

  return (
    <LayoutBase>
      {/* <DeleteUser /> */}
      <LayoutMyPage>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
          <MainWrap style={{width: '100%', position: 'relative'}}>
            <button onClick={() => Navigate(-1)} style={{position: 'absolute', top: '1rem', left: '1rem'}}>
              <MenuIcon src={ArrowLeft} alt="ArrowLeft" />
            </button>
            <ChildInfo />
          </MainWrap>
        </div>
      </LayoutMyPage>
    </LayoutBase>
  );
}

export default ChildMyPage;
