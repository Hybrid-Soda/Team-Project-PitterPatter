import React, { useState, useEffect } from 'react';
import { rankingListGet } from '../../Child/childApi.js';
import styled from 'styled-components';
import {
  OuterBox,
  InnerBox,
  RankWrap,
  RankOrder,
  RankBarWrap,
  RankBar,
  RankName,
  ProfileImg,
  RankBarOverlay
} from './RankStyle';
import Header from '../../LandingPage/Header';
import Trophy from '/src/assets/img/Rank/Trophy.png';
import firstMedal from '/src/assets/img/Rank/1st.png';
import secondMedal from '/src/assets/img/Rank/2nd.png';
import thirdMedal from '/src/assets/img/Rank/3rd.png';

const MedalIMG = styled.img`
  width: 2rem;
`;

const CollapseContent = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  height: ${(isCollapsed) => isCollapsed ? `1rem` : `0`};
  transition: ease-in-out .3s;
`;

function Rank() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [childRank, setChildRank] = useState(-1);

  const childId = 1; // 테스트용 childId 변수 선언
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDg2MjMsImlhdCI6MTcyMjkwODYyMywiZXhwIjoxNzIyOTA5NTIzLCJqdGkiOiI2MjdiNDA1Zi02OGUwLTQwNTMtYjA2Mi01NWI3ZTcyZjdjNmYifQ.SmkBbWFtTtyZNwkfSXF9wjaXJ1qEIA7WWkS1UFiUsRmqrHXzYKdiAn4Bk4N5zV6GiNg_UdCkRAcV2vKa4TB_vA";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rankingData = await rankingListGet(childId, token);
        const formattedData = rankingData.data.map((item, idx) => {
          console.log(childRank);
          if(childId == item.childId) {
            setChildRank(idx);
            console.log(childId);
          }
          return {
            childId: item.childId,
            nickname: item.nickname,
            profileImage: item.profileImage,
            maxScore: item.maxScore,
            ranking: item.ranking
          };
        });
        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error('다음과 같은 문제가 발생 했습니다:', error);
      }
    };
    fetchData();
  }, [childId, token]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleImageError = (e) => {
    e.target.src = Trophy;
  };

  return (
    <div>
      <Header />
      <OuterBox>
        <RankBarOverlay>
          <RankBarWrap style={{ left: "41vw" }} delay={0}>
            {/* trophy 사진 대신 유저 프로필 사진 넣어야 함 */}
            <ProfileImg src={data.length > 0 ? data[0].profileImage : Trophy} alt="Trophy" onError={handleImageError} />
            <RankBar style={{ height: "69vh" }}>
              <RankName>
                <MedalIMG src={firstMedal} alt="" />
                {data.length > 0 ? data[0].nickname : ""}
              </RankName>
            </RankBar>
          </RankBarWrap>
          <RankBarWrap style={{ left: "11vw" }} delay={0.3}>
            <ProfileImg src={data.length > 1 ? data[1].profileImage : Trophy} alt="Trophy" onError={handleImageError} />
            <RankBar style={{ height: "62vh" }}>
              <RankName>
                <MedalIMG src={secondMedal} alt="" />
                {data.length > 1 ? data[1].nickname : ""}
              </RankName>
            </RankBar>
          </RankBarWrap>
          <RankBarWrap style={{ left: "71vw" }} delay={0.5}>
            <ProfileImg src={data.length > 2 ? data[2].profileImage : Trophy} alt="Trophy" onError={handleImageError} />
            <RankBar style={{ height: "58vh" }}>
              <RankName>
                <MedalIMG src={thirdMedal} alt="" />
                {data.length > 2 ? data[2].nickname : ""}
              </RankName>
            </RankBar>
          </RankBarWrap>
        </RankBarOverlay>
        <InnerBox>
          <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
          <RankWrap>
            <div>
              <RankOrder># {data.length > 3 ? data[3].ranking : 999}</RankOrder>
              <span>{data.length > 3 ? data[3].nickname : ""}</span>
            </div>
            <span>{data.length > 3 ? data[3].maxScore : ""}</span>
          </RankWrap>
          <RankWrap  style={{ backgroundColor: '#ffe75c47' }}>
            <div>
              <RankOrder># {data.length > 4 ? data[4].ranking : 999}</RankOrder>
              <span>{data.length > 4 ? data[4].nickname : ""}</span>
            </div>
            <span>{data.length > 4 ? data[4].maxScore : ""}</span>
          </RankWrap>
            {/* <CollapseContent activate={toggleCollapse}>
              <p>최고 점수 ##</p>
            </CollapseContent> */}
          <RankWrap>
            <div>
              <RankOrder># {data.length > 5 ? data[5].ranking : 999}</RankOrder>
              <span>{data.length > 5 ? data[5].nickname : ""}</span>
            </div>
            <span>{data.length > 5 ? data[5].maxScore : ""}</span>
          </RankWrap>
          <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
        </InnerBox>
      </OuterBox>
    </div>
  );
}

export default Rank;