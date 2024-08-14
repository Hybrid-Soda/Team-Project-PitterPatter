import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  MainWrap,
  CenterColumn,
  CenterRow,
  Title,
  Frame,
  BlankRow,
  Blank,
  UserImg,
  Toolbar,
  Button,
  ToolWrap,
  ToolTitle,
  ToolRow,
  Tool,
  ToolImg,
} from "./SnapshotStyle";
import Share from "/src/assets/img/Snapshot/share.png";
import Save from "/src/assets/img/Snapshot/save.png";
import Header from "../../LandingPage/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";

function SnapshotResult() {
  const location = useLocation();
  const { imageList } = location.state;
  const FrameImage = "https://ssafy-common.b-cdn.net/frame_" + useSelector((state) => state.item.frameItem) + ".png";
  const navigate = useNavigate();
  const frameRef = useRef(null);  // Frame 컴포넌트를 참조하기 위한 ref

  const downloadFrameImage = () => {
    const frameElement = frameRef.current; // Frame 컴포넌트의 실제 DOM 요소를 참조
    html2canvas(frameElement, {
      useCORS: true, // CORS 문제 해결을 위한 옵션 추가
      backgroundColor: null, // 배경색을 null로 설정하여 원본 그대로 캡처
      // backgroundColor: 'rgba(0, 0, 0, 0)'
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "MyPhoto.png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, "image/png");
    });
  };

  const goBack = () => {
    navigate('/game/select-mode');
  };

  return (
    <MainWrap>
      <Header />
      <CenterColumn>
        <Title>우와 멋진 사진이네요 !</Title>
        <CenterRow>
          <Frame ref={frameRef} style={{ backgroundImage: `url(${FrameImage})` }}>
            <BlankRow>
              <Blank>
                {imageList && <UserImg src={imageList[0]} alt="snapshot" />}
              </Blank>
              <Blank>
                {imageList && <UserImg src={imageList[1]} alt="snapshot" />}
              </Blank>
            </BlankRow>
            <BlankRow>
              <Blank>
                {imageList && <UserImg src={imageList[2]} alt="snapshot" />}
              </Blank>
              <Blank>
                {imageList && <UserImg src={imageList[3]} alt="snapshot" />}
              </Blank>
            </BlankRow>
          </Frame>
          <Toolbar>
            <Button onClick={goBack}>게임 선택으로 돌아가기</Button>
            <Link style={{width: '100%', height: '10%'}} to='/'><Button>메인 화면으로 돌아가기</Button></Link>
            <ToolWrap>
              <ToolTitle>다양한 방법으로 사진을 보관해보세요!</ToolTitle>
              <ToolRow>
                <Tool>
                  <ToolImg src={Share} alt="share" />
                  <span>공유하기</span>
                </Tool>
                <Tool onClick={downloadFrameImage}>
                  <ToolImg src={Save} alt="save" />
                  <span>저장하기</span>
                </Tool>
              </ToolRow>
            </ToolWrap>
          </Toolbar>
        </CenterRow>
      </CenterColumn>
    </MainWrap>
  );
}

export default SnapshotResult;
