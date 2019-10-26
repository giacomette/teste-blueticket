import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 16px;
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
  color: white;
  float: left;
  margin-top: 50px;

  h2 {
    font-size: 2em;
  }

  @media all and (max-width: 400px) {
    float: none;
    text-align: center;
    margin-top: 20px;
  }
`;

export const WrapperHeaderTemp = styled.div`
  color: white;
  float: right;
  margin-top: 50px;
  text-align: right;
  position: relative;
  z-index: 1;
  h2 {
    font-size: 2em;
  }

  @media all and (max-width: 400px) {
    float: none;
    text-align: center;
    margin-top: 0;
  }
`;

export const WrapperHeaderTempImage = styled.div`
  position: absolute;
  top: -20px;
  right: 50px;
  z-index: -1;

  img {
    width: 80px;
  }
`;

export const WrapperHeaderButton = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -16px;

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
