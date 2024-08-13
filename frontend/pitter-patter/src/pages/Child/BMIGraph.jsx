import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

  const childId = useSelector((state) => state.child.id);
  const token = useSelector((state) => state.token.accessToken);

  const startDate = '2024-07-24';
  const endDate = '2024-08-16';
  const age = 10; // 테스트용 나이
  const gender = useSelector((state) => state.child.gender)
  // const childName = "배준짱"; // 테스트용 이름
  const nickname = useSelector((state) => state.child.nickname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bmiHistoryData = await childBMIHistory(childId, startDate, endDate, token);
        const formattedData = bmiHistoryData.data.map(item => {
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
    console.log(criteria)
    if (bmi < criteria.underweight) return "저체중";
    if (bmi >= criteria.normal && bmi <= criteria.overweight) return "정상";
    if (bmi >= criteria.overweight && bmi <= criteria.obese)  return "과체중";
    return "비만";
  };

  const getColor = (bmiLevel) => {
    switch (bmiLevel) {
      case "저체중":
        return "red";
      case "정상":
        return "green";
      case "과체중":
        return "blue";
      case "비만":
        return "purple";
      default:
        return "black";
    }
  };

  return (
    <ContentBody>
      <GraphHeader>
        <span>키나 몸무게를 최근에 새로 측정하셨나요? 지금 추가해서 그래프를 업데이트 해보세요! </span>
        <a href='/child/physical-info'>추가하러 가기</a>
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
        <p>{data.length !== 0 ? `현재 BMI는 ${data[data.length - 1].bmi}입니다.` : '키와 몸무게를 먼저 등록해주세요.'} </p>
        <p>
          {data.length !== 0 ? (  
            <>
              {nickname} 님의 나이에서 해당 BMI는{' '}
              <span style={{ color: getColor(data[data.length - 1].bmiLevel) }}>
                {data[data.length - 1].bmiLevel}
              </span>
              입니다.
            </>
          ) : (
            ''
          )}
        </p>
      </GraphFooter>
    </ContentBody>
  );
}

export default BMIGraph;
