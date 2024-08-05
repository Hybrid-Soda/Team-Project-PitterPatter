import React, { useState, useEffect } from 'react';
import { bmiCriteria } from './bmiCriteria.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { childBMIHistory } from './../Child/childApi.js';  // API 함수 임포트
import { 
  LayoutActivityPage, 
  LayoutGraphList, 
  PlaytimeGraph, 
  GraphHeader, 
  GraphFooter, 
  ContentBody 
} from './BMIGraphStyle';

function BMIGraph() {
  const [data, setData] = useState([]);
  const childId = 1; // 테스트용 childId 변수 선언
  const startDate = '2024-07-24';
  const endDate = '2024-08-05';
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI4MjYyNTksImlhdCI6MTcyMjgyNjI1OSwiZXhwIjoxNzIyODI5MjU5LCJqdGkiOiJkNmQyZmUzNC05ZjI2LTRiNmYtYTVkNC0wM2U5YTM0ZDIzNTQifQ.U-4c1wQs0M5MnPcC3LvqYfJRbqQ9BUWMrAdS1RzPuwuAoFaYQiOLxamU6a51QNP_vgRmlCgCkxAGSiPmDWvgwg";
  const age = 10; // 테스트용 나이
  const gender = 'male'; // 테스트용 성별
  const childName = "배준짱"; // 테스트용 이름

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bmiHistoryData = await childBMIHistory(childId, startDate, endDate, token);
        const formattedData = bmiHistoryData.map(item => {
          const bmiLevel = getBmiLevel(age, gender, item.bmi);
          return {
            updatedAt: formatDateToYYYYMMDD(item.updatedAt),
            bmi: item.bmi,
            bmiLevel: bmiLevel
          };
        });
        // 날짜 순으로 정렬
        formattedData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        setData(formattedData);
      } catch (error) {
        console.error('다음과 같은 문제가 발생 했습니다:', error);
      }
    };
    fetchData();
  }, [childId, startDate, endDate, token, age, gender]);

  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return ''; // dateString이 undefined인 경우 빈 문자열 반환
    return dateString.split('T')[0];
  };

  const getBmiLevel = (age, gender, bmi) => {
    const criteria = bmiCriteria[age][gender];
    if (bmi < criteria.underweight) return "저체중";
    if (bmi < criteria.normal) return "정상";
    if (bmi < criteria.overweight) return "과체중";
    return "비만";
  };

  return (
    <ContentBody>
      <GraphHeader>
        <span>키나 몸무게를 최근에 새로 측정하셨나요? 지금 추가해서 그래프를 업데이트 해보세요! </span>
        <a>추가하러 가기</a>
      </GraphHeader>
      <LayoutActivityPage>
        <LayoutGraphList>
          <PlaytimeGraph>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="updatedAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bmi" stroke="#003f89" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </PlaytimeGraph>
        </LayoutGraphList>
      </LayoutActivityPage>
      <GraphFooter>
        <p>현재 BMI는 {data.length !== 0 ? data[data.length - 1].bmi : '###'} 입니다. </p>
        <p>{childName} 님의 나이에서 해당 BMI는 {data.length !== 0 ? data[data.length - 1].bmiLevel : '###'} 입니다. </p>
      </GraphFooter>
    </ContentBody>
  );
}

export default BMIGraph;
