import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";

const OverlayWrapper = styled.div`
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

function LoadingOverlay({ spinnerProps }) {
  //   const radius = spinnerProps.radius ? spinnerProps.radius : 30;
  return (
    <OverlayWrapper>
      <div>
        <Spinner {...spinnerProps} />
      </div>
    </OverlayWrapper>
  );
}

export default LoadingOverlay;
