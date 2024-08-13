import mapShop from "../../assets/img/Shop/mapShop.png";
import frameShop from "../../assets/img/Shop/frameShop.png";

import { Wallpaper, BoxWrap, ImageBox, GameImage, ItemName } from "./ShopStyle";

import { Link } from "react-router-dom";
import Header from "../LandingPage/Header";

import BackgroundImg from "/src/assets/img/Background/YellowWave.png";

function Shop() {
  return (
    <Wallpaper style={{backgroundImage: `url(${BackgroundImg})`}}>
      <Header />
      <Link to="/shop/snapshot">
        <BoxWrap bgColor="#ffe65c">
          <ImageBox shadow="4px 4px 27.5px 0px #c0a93e inset">
            <GameImage src={frameShop} alt="frameShop" />
          </ImageBox>
          <ItemName color="#f9810a">네 컷 프레임 상점</ItemName>
        </BoxWrap>
      </Link>
      <Link to="/shop/wallpaper">
        <BoxWrap bgColor="#a4e6f3">
          <ImageBox shadow="4px 4px 27.5px 0px #6ca0ab inset">
            <GameImage src={mapShop} alt="mapShop" />
          </ImageBox>
          <ItemName color="#17b1f3">게임 배경 상점</ItemName>
        </BoxWrap>
      </Link>
    </Wallpaper>
  );
}

export default Shop;
