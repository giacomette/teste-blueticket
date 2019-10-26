import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 100%;
`;

export const WrapperHeader = styled.div`
  background: #007dbb;
  float: left;
  height: 160px;
  margin-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  width: 100%;

  @media all and (max-width: 400px) {
    height: auto;
  }
`;

export const WrapperHeaderTitle = styled.div`
  font-size: 2.5em;
  color: white;
  float: left;
  margin-top: 60px;

  @media all and (max-width: 400px) {
    float: none;
    text-align: center;
    margin-top: 20px;
    font-size: 2em;
  }
`;

export const WrapperHeaderTemp = styled.div`
  font-size: 2.5em;
  color: white;
  float: right;
  margin-top: 60px;

  @media all and (max-width: 400px) {
    float: none;
    text-align: center;
    margin-top: 0;
  }
`;

export const WrapperHeaderButton = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;

  @media all and (max-width: 400px) {
    & {
      left: 0;
      width: 100%;
      transform: none;
      position: relative;
    }

    button {
      width: 100%;
    }
  }
`;
