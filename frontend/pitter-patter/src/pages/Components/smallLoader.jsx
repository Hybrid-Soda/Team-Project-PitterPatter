import styled from "styled-components";

const Spinner = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--logo-pink-color);
  border-radius: 50%;
  width: 30%;
  height: 30%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const smallLoader = () => {
  return (
    <>
        <Spinner />
    </>
  );
};


export default smallLoader;