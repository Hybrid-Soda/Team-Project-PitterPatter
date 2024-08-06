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
  const [childIdx, setChildIdx] = useState(-1);

  const childId = 11; // 테스트용 childId 변수 선언
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MjA0NDIsImlhdCI6MTcyMjkyMDQ0MiwiZXhwIjoxNzIyOTIxMzQyLCJqdGkiOiIyMDY3MTI5Zi04ZTAxLTQ1MjAtOTg5Yi0zNjY1ZWRkNGVlMGEifQ.PjXkywsjZ682B6MU4OOD4HT0zFRBln9YDUTg7kchkPd7Nqri0xd-KG8DWlPE7joRNjSkpSD30rsgfqau1GPWfw";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rankingData = await rankingListGet(childId, token);
        const formattedData = rankingData.data.map((item, idx) => {
          if(childId == item.childId) {
            setChildIdx(idx);
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
      } catch (error) {
        console.error('다음과 같은 문제가 발생 했습니다:', error);
      }
    };
    fetchData();
  }, [childId, token]);

  const handleImageError = (e) => {
    e.target.src = Trophy;
  };

  const renderRankWraps = (index) => {
    if (data.length > 0) {
      let content;
  
      if (index === 0) {
        content = (
          <>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
            <RankWrap style={{ backgroundColor: '#ffe75c47' }}>
              <div>
                <RankOrder># {data[index].ranking}</RankOrder>
                <span>{data[index].nickname}</span>
              </div>
              <span>{data[index].maxScore}</span>
            </RankWrap>
            <RankWrap>
              <div>
                <RankOrder># {data.length > index+1 ? data[index+1].ranking : 999}</RankOrder>
                <span>{data.length > index+1 ? data[index+1].nickname : ""}</span>
              </div>
              <span>{data.length > index+1 ? data[index+1].maxScore : ""}</span>
            </RankWrap>
            <RankWrap>
              <div>
                <RankOrder># {data.length > index+2 ? data[index+2].ranking : 999}</RankOrder>
                <span>{data.length > index+2 ? data[index+2].nickname : ""}</span>
              </div>
              <span>{data.length > index+2 ? data[index+2].maxScore : ""}</span>
            </RankWrap>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
          </>
        );
      } else if (index === data.length - 1) {
        content = (
          <>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
            <RankWrap>
              <div>
                <RankOrder># {data.length > 2 ? data[index-2].ranking : 999}</RankOrder>
                <span>{data.length > 2 ? data[index-2].nickname : "NoName"}</span>
              </div>
              <span>{data.length > 2 ? data[index-2].maxScore : 0}</span>
            </RankWrap>
            <RankWrap>
              <div>
                <RankOrder># {data.length > 1 ? data[index-1].ranking : 999}</RankOrder>
                <span>{data.length > 1 ? data[index-1].nickname : "NoName"}</span>
              </div>
              <span>{data.length > 1 ? data[index-1].maxScore : 0}</span>
            </RankWrap>
            <RankWrap style={{ backgroundColor: '#ffe75c47' }}>
              <div>
                <RankOrder># { data[index].ranking } </RankOrder>
                <span>{ data[index].nickname }</span>
              </div>
              <span>{ data[index].maxScore }</span>
            </RankWrap>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
          </>
        );
      } else {
        content = (
          <>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
            <RankWrap>
              <div>
                <RankOrder># { data[index-1].ranking } </RankOrder>
                <span>{ data[index-1].nickname }</span>
              </div>
              <span>{ data[index-1].maxScore }</span>
            </RankWrap>
            <RankWrap style={{ backgroundColor: '#ffe75c47' }}>
              <div>
                <RankOrder># { data[index].ranking } </RankOrder>
                <span>{ data[index].nickname }</span>
              </div>
              <span>{ data[index].maxScore }</span>
            </RankWrap>
            <RankWrap>
              <div>
                <RankOrder># { data[index+1].ranking }</RankOrder>
                <span>{ data[index+1].nickname }</span>
              </div>
              <span>{ data[index+1].maxScore }</span>
            </RankWrap>
            <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
          </>
        );
      }
  
      return (
        <InnerBox>
          {content}
        </InnerBox>
      );
    }
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
          {childIdx >= 0 ? (
            renderRankWraps(childIdx)
          ) : (
            <InnerBox>
              <h2>자녀의 기록이 존재하지 않습니다.</h2>
            </InnerBox>
          )}
      </OuterBox>
    </div>
  );
}

export default Rank;