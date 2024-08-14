import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutBase,
  LayoutProfileWrap,
  MainText,
  ProfileList,
  Profile,
  ProfileImage,
  IconPlus,
  UserId,
  LayoutMypage,
  MypageButton,
} from './SelectProfileStyle';
import PlusSquare from "../../assets/icons/PlusSquare.png";
import { useDispatch, useSelector } from 'react-redux';
import { setChild, setChildError } from '../../redux/childSlice'; // 적절한 경로에 맞게 import 필요
import { childApi } from '../../apiService';
import { clearChild } from '../../redux/childSlice';
import { clearItem, getItem, setItem } from '../../redux/itemSlice';
import Modal from '../Components/modal'; // Modal 임포트

function SelectProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessToken);

  const [childList, setChildList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 메시지 상태 추가

  const goMypage = () => {
    navigate('/SFA');
  };

  const goToAddProfile = () => {
    dispatch(clearChild()); // clearChild 액션을 디스패치하여 상태를 초기화
    dispatch(clearItem());
    navigate('/child/mypage', { state: { addProfile: true } });
  };

  const getChildList = async () => {
    try {
      const response = await childApi.get("", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setChildList(response.data);

    } catch (error) {
      if (error.reponse.data && error.response.data.msg === "해당 데이터가 존재하지 않습니다.") {
        return;
      }
      setModalMessage(error.response.data.msg); // 에러 메시지 설정
      setIsModalOpen(true); // 모달 열기
    }
  };

  useEffect(() => {
    getChildList();
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 호출

  const fetchChildData = async (childId) => {
    try {
      const response = await childApi.get(`/${childId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setChild(response.data));

      const resultAction = await dispatch(getItem());
    
      // getItem이 성공적으로 완료되었는지 확인
      if (getItem.fulfilled.match(resultAction)) {
        // 성공한 경우 setItem으로 결과를 저장
        console.log(resultAction.payload)
        dispatch(setItem(resultAction.payload));
      } else {
        console.error('Error fetching items:', resultAction.error.message);
      }

      console.log('set')
    } catch (error) {
      console.error('Error fetching child data:', error.response?.data || error.message);
      dispatch(setChildError(error.response?.data || '오류'));
      setModalMessage(error.response?.data.msg || '오류'); // 에러 메시지 설정
      setIsModalOpen(true); // 모달 열기
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <LayoutBase>
      <LayoutProfileWrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MainText>플레이어를 선택해주세요.</MainText>
          <ProfileList>
            {childList.map((child) => (
              <Link to='/' style={{ alignItems: 'flex-start' }} key={child.id}>
                <Profile onClick={() => fetchChildData(child.id)}>
                  <ProfileImage alt={`${child.userId} profile`} style={{overflow: 'hidden'}}>
                    <IconPlus src={child.profileImage} style={{width: '100%', height: '100%'}}></IconPlus>
                  </ProfileImage>
                  <UserId>{child.nickname}</UserId>
                </Profile>
              </Link>
            ))}
            <Profile onClick={goToAddProfile}>
              <ProfileImage className="profile-add">
                <IconPlus src={PlusSquare} alt="PlusSquare" />
              </ProfileImage>
            </Profile>
          </ProfileList>
          <LayoutMypage>
            <MypageButton onClick={goMypage}>
              회원정보 수정
            </MypageButton>
          </LayoutMypage>
        </div>
      </LayoutProfileWrap>

      {isModalOpen && (
        <Modal title={modalMessage} onClose={closeModal}>
        </Modal>
      )}
    </LayoutBase>
  );
}

export default SelectProfile;
