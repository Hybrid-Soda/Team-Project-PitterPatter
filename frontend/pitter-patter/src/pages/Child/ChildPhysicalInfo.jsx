import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { childPhysicalInfoListGet, childPhysicalInfoRegist, childPhysicalInfoUpdate } from './../Child/childApi.js';  // API 함수 임포트
import { ContentBody, PhysicalInfoInput, PhysicalInfoHistory, PhysicalInfoHistoryInnerDiv, ImgDiv, InputDiv, InputInnerDiv, AddBtnDiv } from './ChildPhysicalInfoStyle';
import Modal from '../Components/modal.jsx'; // 모달 임포트

// 데이터 가져오기 메소드
const fetchData = async (childId, token, setPhysicalInfoData) => {
    try {
        const data = await childPhysicalInfoListGet(childId, token);
        setPhysicalInfoData(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function ChildPhysicalInfo() {
    const [physicalInfoData, setPhysicalInfoData] = useState([]);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editHeight, setEditHeight] = useState('');
    const [editWeight, setEditWeight] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 관리

    const childId = useSelector((state) => state.child.id);
    const token = useSelector((state) => state.token.accessToken);
    const profileImage = useSelector((state) => state.child.profileImage);

    // 페이지 로딩 시 데이터 가져오기
    useEffect(() => {
        fetchData(childId, token, setPhysicalInfoData);
    }, [childId, token]);

    const formatDateToYYYYMMDD = (dateString) => {
        if (!dateString) return ''; // dateString이 undefined인 경우 빈 문자열 반환
        return dateString.split('T')[0];
    };

    const handleAdd = async () => {
        if (!height || !weight) {
            setModalMessage("키와 몸무게를 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        if (height <= 20 || height >= 255) {
            setModalMessage("키는 20 이상 255 이하의 값을 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        if (weight < 0 || weight >= 255) {
            setModalMessage("몸무게는 0 이상 255 이하의 값을 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        const newEntry = {
            height: `${height}`,
            weight: `${weight}`,
        };

        try {
            await childPhysicalInfoRegist(childId, token, newEntry);
            await fetchData(childId, token, setPhysicalInfoData); // 데이터 새로고침
            setHeight('');
            setWeight('');
        } catch (error) {
            console.error('Error adding physical info:', error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditHeight(physicalInfoData[index].height);
        setEditWeight(physicalInfoData[index].weight);
    };

    const handleSave = async (index) => {
        if (!editHeight || !editWeight) {
            setModalMessage("키와 몸무게를 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        if (editHeight <= 20 || editHeight >= 255) {
            setModalMessage("키는 20 이상 255 이하의 값을 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        if (editWeight < 0 || editWeight >= 255) {
            setModalMessage("몸무게는 0 이상 255 이하의 값을 입력해주세요.");
            setIsModalOpen(true);
            return;
        }

        const updatedData = {
            id: physicalInfoData[index].id,  // physical_record_id 설정
            height: `${editHeight}`,
            weight: `${editWeight}`,
        };

        try {
            await childPhysicalInfoUpdate(childId, token, updatedData);
            await fetchData(childId, token, setPhysicalInfoData); // 데이터 새로고침
            setEditIndex(null);
            setEditHeight('');
            setEditWeight('');
        } catch (error) {
            console.error('Error updating physical info:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
    };

    return (
      <ContentBody>
        <PhysicalInfoInput>
            <ImgDiv>
                <img src={profileImage} alt="profile-image" />
            </ImgDiv>
            <InputDiv>
                <InputInnerDiv>
                    <div>
                        <label>현재 키</label>
                    </div>
                    <input 
                        type="number" 
                        placeholder="키를 입력하세요" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)} 
                        style={{height: '3vh', border: '1px solid var(--font-color)', borderRadius: '.5rem'}}
                    />
                </InputInnerDiv>
                <InputInnerDiv>
                    <div>
                        <label>현재 몸무게</label>
                    </div>
                    <input 
                        type="number" 
                        placeholder="몸무게를 입력하세요" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)} 
                        style={{height: '3vh', border: '1px solid var(--font-color)', borderRadius: '.5rem'}}
                    />
                </InputInnerDiv>
            </InputDiv>
            <AddBtnDiv>
                <button onClick={handleAdd}>추가</button>
            </AddBtnDiv>
        </PhysicalInfoInput>
        <PhysicalInfoHistory>
            <PhysicalInfoHistoryInnerDiv>
                {physicalInfoData.map((info, index) => (
                    <div key={index}>
                        {editIndex === index ? (
                            <div>
                                <input 
                                    type="number" 
                                    value={editHeight} 
                                    onChange={(e) => setEditHeight(e.target.value)} 
                                    style={{width: '11em', height: '1em', border: 'none'}}
                                />
                                <input 
                                    type="number" 
                                    value={editWeight} 
                                    onChange={(e) => setEditWeight(e.target.value)} 
                                    style={{width: '8.8em', height: '1em', border: 'none'}}
                                />
                                <button onClick={() => handleSave(index)}>저장하기</button>
                            </div>
                        ) : (
                            <div>
                                <span>키: {info.height} 몸무게: {info.weight}</span>
                                <span>{formatDateToYYYYMMDD(info.createdAt)}</span>
                                <button onClick={() => handleEdit(index)}>수정하기</button>
                            </div>
                        )}
                    </div>
                ))}
            </PhysicalInfoHistoryInnerDiv>
        </PhysicalInfoHistory>
        {isModalOpen && (
            <Modal title="알림" onClose={closeModal} transparent={true}>
                {modalMessage}
            </Modal>
        )}
      </ContentBody>
    );
}

export default ChildPhysicalInfo;
