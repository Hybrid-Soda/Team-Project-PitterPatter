import styled from 'styled-components';

export const LayoutBase = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

export const LayoutModal = styled.div`
    width: 40vw;
    height: 40vh;
    background-color: white;
    border-radius: 3.5rem;
    box-shadow: 0px 4px 16.5px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;    
`

export const LayoutTitle = styled.div`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
`

export const LayoutContext = styled.div`
    color: var(--font-color);
    text-align: center;
    margin-bottom: 2.5rem;
`

export const LayoutInput = styled.div`
    display: flex;
    gap: 1vw;
`
    
export const EmailInput = styled.input`
    height: 3.5vh;
    width: 16vw;
    border-radius: .3rem;
    border: 1px solid #D9D9D9;
    padding: .5rem;

    ::placeholder {
        color: #D9D9D9;
    }
`

export const NoButton = styled.button`
    color: #757575;
    font-weight: normal;
    font-size: 1.2rem;
    text-decoration: underline;
`

export const SubmitButton = styled.button`
    /* color: var(--font-color); */
    border-radius: 1.5rem;
    background-color: #FFD8DF;
    box-shadow: #FA6DA1 0 .6vh;
    font-size: 1.2rem;
    height: 5vh;
    padding: .5rem 1.5rem;

    &:hover:not(:disabled) {
    transform: translateY(1px);
    }

    &:active:not(:disabled) {
        box-shadow: ${(props) => (props.highlight ? "0 1px 0 0 #FA6DA1" : "0 1px 0 0 #FA6DA1")};
        transform: translateY(2px);
    }

    &:disabled {
        color: black;
        background-color: #B3B3B3;
        box-shadow: 0 -3px 1px 0 #757575;
        cursor: auto;
    }
`