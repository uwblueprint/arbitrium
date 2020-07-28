import styled from "styled-components";

const Dialog = styled.div`
  background: white;
  color: black;
  display: inline-block;
  left: 50%;
  margin: auto;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }

  padding: ${({ paddingHorizontal, paddingVertical }) =>
    `${paddingVertical || 0}px ${paddingHorizontal || 0}px ${paddingVertical ||
      0}px ${paddingVertical || 0}px`};

  position: fixed;
  top: 50%;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "auto")};
  z-index: 1000;

  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export default Dialog;
