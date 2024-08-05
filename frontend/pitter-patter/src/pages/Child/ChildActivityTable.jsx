import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  LayoutActivityPage, 
  LayoutGraphList, 
  PlaytimeGraph, 
  GraphHeader, 
  GraphFooter, 
  ContentBody 
} from './ChildActivityTableStyle';

const data = [
  {
    name: '2024-07-14',
    playtime: 120,
  },
  {
    name: '2024-07-15',
    playtime: 150,
  }, {
    name: '2024-07-16',
    playtime: 160,
  }, {
    name: '2024-07-17',
    playtime: 20,
  }, {
    name: '2024-07-18',
    playtime: 80,
  }, {
    name: '2024-07-19',
    playtime: 60,
  },
];

function ChildActivityTable() {
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="playtime" stroke="#003f89" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </PlaytimeGraph>
        </LayoutGraphList>
      </LayoutActivityPage>
      <GraphFooter>
        <p>현재 BMI는 ### 입니다. </p>
        <p>### 님의 나이에서 해당 BMI는 ### 입니다. </p>
      </GraphFooter>
    </ContentBody>
  );
}

export default ChildActivityTable;
