import styled from "styled-components";

export const padding = "28px";
export const Wrapper = styled.div`
  background: white;
  display: inline-block;
  left: 50%;
  margin: auto;
  padding: ${padding};
  position: fixed;
  top: 50%;
  width: 400px;
  z-index: 1000;

  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  h4 {
    display: inline-block;
    margin: 5px 0px;
    font-size: 16px;
  }
  max-height: 70%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  padding-bottom: ${padding};
  h4 {
    margin: 0;
    font-weight: normal;
    display: inline-block;
    font-size: calc(0.3vh + 0.5vw + 10px);
  }
`;
