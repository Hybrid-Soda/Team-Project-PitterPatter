import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearChild } from '../../redux/childSlice';
import { clearToken } from '../../redux/tokenSlice';
import Modal from '../Components/modal';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 25px;
  width: 8vw; 
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: 30px;
  top: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileButton = styled.button`
  width: 8vw;
  height: 3.5vh;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: var(--box-yellow-color);
    transition: ease-in-out 0.2s;
    opacity: 0.7;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #D9D9D9;
  margin: 10px 0;
`;

function ProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const childId = useSelector((state) => state.child.id);
  const token = useSelector((state) => state.token.accessToken);

  const handleNavigation = (path) => {
    if (token === null) {
      navigate('/login');
      return
    }
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearChild());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/'); // 모달을 닫을 때 리다이렉트
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <GridItem>
          <ProfileButton onClick={() => handleNavigation('/child/mypage')}>
            마이 페이지
          </ProfileButton>
        </GridItem>
        <Divider />
        <GridItem>
          <ProfileButton onClick={() => handleNavigation('/select-profile')}>
            프로필 변경
          </ProfileButton>
        </GridItem>
        {childId !== null && (
          <>
            <Divider />
            <GridItem>
              <ProfileButton onClick={handleLogout}>
                로그아웃
              </ProfileButton>
            </GridItem>

          </>
        )}
        {childId === null && (
          <>
            <Divider />
            <GridItem>
              <ProfileButton onClick={handleLogin}>
                로그인
              </ProfileButton>
            </GridItem>
          </>
        )}
      </ModalContent>
      {isModalOpen && (
        <Modal title="로그아웃" onClose={closeModal}>
          <p>로그아웃 되었습니다.</p>
        </Modal>
      )}
    </ModalOverlay>
  );
}

export default ProfileModal;
