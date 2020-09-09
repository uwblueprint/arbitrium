import styled from "styled-components";
import { MAX_NAVBAR_WIDTH } from "../Navigation/Navigation";


function createContainer(admin) {
  const ApplicationContainer = styled.div`
    margin-left: ${MAX_NAVBAR_WIDTH}px;
    margin-Bottom: 50px;
  `;

  const AdminContainer = styled.div`
    margin-left: 0px;
    margin-Bottom: 50px;
  `;

  if (admin) {
    return (AdminContainer)
  }
  else {
    return (ApplicationContainer)
  }
}

export default createContainer;
