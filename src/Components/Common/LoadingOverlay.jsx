import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";

const OverlayWrapper = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.3);
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function LoadingOverlay({ show, spinnerProps }) {
  if (!show) return null;
  return (
    <OverlayWrapper>
      <div>
        <Spinner color="#333" radius={64} visible {...spinnerProps} />
      </div>
    </OverlayWrapper>
  );
}

export default LoadingOverlay;
