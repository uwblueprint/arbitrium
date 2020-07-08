import styled from "styled-components";

const Dialog = styled.div`
  background: white;
  display: inline-block;
  left: 50%;
  margin: auto;

  padding: ${({ paddingHorizontal, paddingVertical }) =>
    `${paddingVertical || 0}px ${paddingHorizontal || 0}px ${paddingVertical ||
      0}px ${paddingVertical || 0}px`};

  position: fixed;
  top: 50%;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  z-index: 1000;

  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export default Dialog;
