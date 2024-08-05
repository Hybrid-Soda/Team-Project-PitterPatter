import React, { useState, useEffect } from 'react';
import { childPhysicalInfoListGet, childPhysicalInfoRegist, childPhysicalInfoUpdate } from './../Child/childApi.js';  // API 함수 임포트
import { ContentBody, PhysicalInfoInput, PhysicalInfoHistory, PhysicalInfoHistoryInnerDiv, ImgDiv, InputDiv, InputInnerDiv, AddBtnDiv } from './ChildPhysicalInfoStyle';

// 데이터 가져오기 메소드
const fetchData = async (childId, token, setPhysicalInfoData) => {
    try {
        const data = await childPhysicalInfoListGet(childId, token);
        console.log('Fetched data:', data); // 데이터 확인용 콘솔 로그
        setPhysicalInfoData(data);
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

    const childId = 1; // 테스트용 childId 변수 선언
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI4MjQ5MjYsImlhdCI6MTcyMjgyNDkyNiwiZXhwIjoxNzIyODI3OTI2LCJqdGkiOiIxYjVmNjJhNy0yYTVjLTQ2ODYtOGJhNi05ZmI2Yjc0MDhmNjEifQ.Sbm6h7f-2D5PK_f9ql6ZA58AfVIcDjQ_bhiNdYUvfTGUAtXwJds-P-IZ-JN_ClOZqkoyrgQXebyqUDKOMRAvFA";

    // 페이지 로딩 시 데이터 가져오기
    useEffect(() => {
        const dummyData = [
            {
                id: 1,
                height: "120.8",
                weight: "23.4",
                updatedAt: "2024-07-01T00:00:00Z"
            },
            {
                id: 2,
                height: "122.5",
                weight: "24.1",
                updatedAt: "2024-07-05T00:00:00Z"
            },
            {
                id: 3,
                height: "123.3",
                weight: "24.8",
                updatedAt: "2024-07-10T00:00:00Z"
            },
            {
                id: 4,
                height: "124.1",
                weight: "25.2",
                updatedAt: "2024-07-15T00:00:00Z"
            },
            {
                id: 5,
                height: "125.0",
                weight: "25.7",
                updatedAt: "2024-07-20T00:00:00Z"
            }
        ];
        
        setPhysicalInfoData(dummyData);
        fetchData(childId, token, setPhysicalInfoData);
    }, [childId, token]);

    const formatDateToYYYYMMDD = (dateString) => {
        if (!dateString) return ''; // dateString이 undefined인 경우 빈 문자열 반환
        return dateString.split('T')[0];
    };

    const handleAdd = async () => {
        if (!height || !weight) {
            alert("키와 몸무게를 입력해주세요.");
            return;
        }

        if (height <= 20 || height >= 255) {
            alert("키는 20 이상 255 이하의 값을 입력해주세요.");
            return;
        }

        if (weight < 0 || weight >= 255) {
            alert("몸무게는 0 이상 255 이하의 값을 입력해주세요.");
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
            alert("키와 몸무게를 입력해주세요.");
            return;
        }

        if (editHeight <= 20 || editHeight >= 255) {
            alert("키는 20 이상 255 이하의 값을 입력해주세요.");
            return;
        }

        if (editWeight < 0 || editWeight >= 255) {
            alert("몸무게는 0 이상 255 이하의 값을 입력해주세요.");
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

    return (
      <ContentBody>
        <PhysicalInfoInput>
            <ImgDiv>
                <img src='/src/assets/img/Game/vs.png' alt="Attendance Background" />
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
                                <span>{formatDateToYYYYMMDD(info.updatedAt)}</span>
                                <button onClick={() => handleEdit(index)}>수정하기</button>
                            </div>
                        )}
                    </div>
                ))}
            </PhysicalInfoHistoryInnerDiv>
        </PhysicalInfoHistory>
      </ContentBody>
    );
}

export default ChildPhysicalInfo;
