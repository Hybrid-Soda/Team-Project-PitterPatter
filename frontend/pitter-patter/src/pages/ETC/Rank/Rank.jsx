import React, { useState } from 'react';
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

  const rankData = [
    {
      rank: 1,
      name: "Ranker 1",
      score: 12323451451243
    },
    {
      rank: 2,
      name: "Ranker 2",
      score: 12323451451243
    },
    {
      rank: 3,
      name: "Ranker 3",
      score: 12323451451243
    },
    {
      rank: 1234,
      name: "Player 1234",
      score: 12323451451243
    },
    {
      rank: 1235,
      name: "Me",
      score: 12323451451243
    },
    {
      rank: 1236,
      name: "Player 1236",
      score: 12323451451243
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Header />
      <OuterBox>
        <RankBarOverlay>
          <RankBarWrap style={{ left: "41vw" }} delay={0}>
            {/* trophy 사진 대신 유저 프로필 사진 넣어야 함 */}
            <ProfileImg src={Trophy} alt="Trophy" />
            <RankBar style={{ height: "69vh" }}>
              <RankName>
                <MedalIMG src={firstMedal} alt="" />
                {rankData[0].name}
              </RankName>
            </RankBar>
          </RankBarWrap>
          <RankBarWrap style={{ left: "11vw" }} delay={0.3}>
            <ProfileImg src={Trophy} alt="Trophy" />
            <RankBar style={{ height: "62vh" }}>
              <RankName>
                <MedalIMG src={secondMedal} alt="" />
                {rankData[1].name}
              </RankName>
            </RankBar>
          </RankBarWrap>
          <RankBarWrap style={{ left: "71vw" }} delay={0.5}>
            <ProfileImg src={Trophy} alt="Trophy" />
            <RankBar style={{ height: "58vh" }}>
              <RankName>
                <MedalIMG src={thirdMedal} alt="" />
                {rankData[2].name}
              </RankName>
            </RankBar>
          </RankBarWrap>
        </RankBarOverlay>
        <InnerBox>
          <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
          <RankWrap>
            <div>
              <RankOrder># {rankData[3].rank}</RankOrder>
              <span>{rankData[3].name}</span>
            </div>
            <span>{rankData[3].score}</span>
          </RankWrap>
          <RankWrap  style={{ backgroundColor: '#ffe75c47' }}>
            <div>
              <RankOrder># {rankData[4].rank}</RankOrder>
              <span>{rankData[4].name}</span>
            </div>
            <span>{rankData[4].score}</span>
          </RankWrap>
            {/* <CollapseContent activate={toggleCollapse}>
              <p>최고 점수 ##</p>
            </CollapseContent> */}
          <RankWrap>
            <div>
              <RankOrder># {rankData[5].rank}</RankOrder>
              <span>{rankData[5].name}</span>
            </div>
            <span>{rankData[5].score}</span>
          </RankWrap>
          <RankWrap style={{padding: '2.5vh 0'}}><div style={{width: '100%', textAlign: 'center'}}>⋮</div></RankWrap>
        </InnerBox>
      </OuterBox>
    </div>
  );
}

export default Rank;
