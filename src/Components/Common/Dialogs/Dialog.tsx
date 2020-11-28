import styled from "styled-components";

type Props = {
  height?: string;
  paddingHorizontal?: number;
  maxHeight?: string;
  paddingVertical?: number;
  width?: string;
};

const Dialog = styled.div<Props>`
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

  padding: ${({ paddingHorizontal, paddingVertical }: Props) =>
    `${paddingVertical || 0}px ${paddingHorizontal || 0}px ${paddingVertical ||
      0}px ${paddingVertical || 0}px`};

  position: fixed;
  top: 50%;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "auto")};
  z-index: 10000;

  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export default Dialog;
