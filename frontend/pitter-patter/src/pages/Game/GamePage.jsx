import { useState, useEffect } from "react";
import { MainWrap } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import WebcamTestPage from "../Game/WebcamTestPage";
import Unity from "./Unity";
import { getWallpaper } from "./gameApi.js";
import AttModal from "./AttModal";
import { useSelector } from "react-redux";
import { assetsApi } from "../../apiService.js";

function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [attModalOpen, setAttModalOpen] = useState(false);

  const handleTestComplete = () => {
    setTestCompleted(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const token = useSelector((state) => state.token.accessToken)
  const openAttModal = async () => {
    try {
      const response = await assetsApi.post('/point', {
        amount: 2, // 예: 100 코인 지급
        source: '게임 플레이 보상',
        childId: childId, // 보내고자 하는 데이터
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // 필요한 경우 인증 헤더 추가
        },
      });
  
      console.log('코인 지급 성공:', response.data);
      setAttModalOpen(true);
    } catch (error) {
      console.error('코인 지급 실패:', error);
      // 에러 처리 로직 추가 가능
    }
  };  

  const closeAttModal = () => {
    setAttModalOpen(false);
  };

  const childId = useSelector((state) => state.child.id);

  useEffect(() => {
    setModalOpen(true); // 페이지 접근 시 모달 창 열기
    getWallpaper(childId); // childId를 넣으면 그 아이가 착용하고 있는 벽의 이미지 주소가 return됨
  }, []);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? <Unity onGameEnd={openAttModal} /> : <WebcamTestPage onTestComplete={handleTestComplete} />}
      {modalOpen && <IsReady onClose={closeModal} />}
      {attModalOpen && <AttModal onClose={closeAttModal} />}
    </MainWrap>
  );
}

export default GamePage;
