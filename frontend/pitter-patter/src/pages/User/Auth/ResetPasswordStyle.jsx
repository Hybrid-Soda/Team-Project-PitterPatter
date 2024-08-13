import styled from 'styled-components';
import PointerImg from "/src/assets/cursor/pointer.png";

export const Layoutbody = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const LayoutContext = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const WrapContext = styled.div`
  width: 30vw;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2vh;
`;

export const Title = styled.div`
  width: 100%;
  font-family: 'TTLaundryGothicB';
  font-size: 2rem;
`;

export const Password = styled.input`
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
  height: 4vh;
`;

export const WarningMessage = styled.div`
  font-size: 1vw;
  color: var(--text-orange-color);
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 5vh;
  border-radius: 1.5rem;
  font-weight: bold;
  background-color: ${props => props.isvalid ? 'var(--box-yellow-color)' : '#ccc'};
  cursor: ${props => props.isvalid ? `url(${PointerImg}), pointer` : 'not-allowed'};
`;
