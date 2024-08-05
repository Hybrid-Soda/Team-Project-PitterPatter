import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutInputH,
  LayoutInModal,
  ModalIcon,
  Htitle,
  Context,
  LayoutButtonWrap,
  Button,
  Checkbox,
  Label,
  Body
} from './styles';
import warningSign from 'src/assets/icons/warningSign.png';

function InputH() {
    return (
        <Body>
            <LayoutInputH>
                <LayoutInModal>
                    <ModalIcon src={warningSign} alt="Warning Sign" />
                </LayoutInModal>
                <LayoutInModal>
                    <Htitle>마지막으로 신체 정보를 입력한지 1주일이 지났습니다.</Htitle>
                </LayoutInModal>
                <LayoutInModal>
                    <Context>정확한 그래프를 위해 꾸준한 입력을 권장드립니다.</Context>
                </LayoutInModal>
                <LayoutInModal style={{ margin: "20px 0" }}>
                    <LayoutButtonWrap>
                        <Link to='/'>
                            <Context style={{ textDecoration: "underline" }}>다음에 할게요.</Context>
                        </Link>
                        <Button>입력하러 가기</Button>
                    </LayoutButtonWrap>
                </LayoutInModal>
                <LayoutInModal style={{ marginBottom: "20px" }}>
                    <Checkbox type="checkbox" id='none-for-a-week' />
                    <Label htmlFor='none-for-a-week'>&nbsp;1주일동안 보지 않기</Label>
                </LayoutInModal>
            </LayoutInputH>
        </Body>
    );
}

export default InputH;
