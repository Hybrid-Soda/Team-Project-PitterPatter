import { useLocation } from "react-router-dom";
import { useRef } from "react";
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

function SnapshotResult() {
  const location = useLocation();
  const { imageList } = location.state;
  const frameRef = useRef(null);
  const navigate = useNavigate();

  const downloadFrameImage = () => {
    const frameElement = frameRef.current;
    html2canvas(frameElement, { backgroundColor: 'rgba(0, 0, 0, 0)' }).then((canvas) => {
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
    navigate('/select-mode');
  };

  return (
    <MainWrap>
      <Header />
      <CenterColumn>
        <Title>우와 멋진 사진이네요 !</Title>
        <CenterRow>
          <Frame ref={frameRef}>
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
