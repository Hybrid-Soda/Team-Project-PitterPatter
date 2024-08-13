import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import Loader from '../../Components/loader.jsx';

const MedalIMG = styled.img`
  width: 2rem;
`;

function Rank() {
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 관리
  const [data, setData] = useState([]);
  const [childIdx, setChildIdx] = useState(-1);

  const childId = useSelector((state) => state.child.id);
  const token = useSelector((state) => state.token.accessToken);

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
      } finally {
        setIsLoading(false);  // 데이터 로드가 완료되면 로딩 상태를 false로 설정
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
      {isLoading ? (
        <Loader />  // 로딩 중일 때 로더를 표시
      ) : (
        <OuterBox>
          <RankBarOverlay>
            <RankBarWrap style={{ left: "41vw" }} delay={0}>
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
              <h2>게임 기록이 아직 없어요. 플레이해서 랭킹을 확인해보세요!</h2>
            </InnerBox>
          )}
        </OuterBox>
      )}
    </div>
  );
}

export default Rank;
