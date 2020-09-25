import styled from "styled-components";
import { MAX_NAVBAR_WIDTH } from "../Navigation/Navigation";

const ApplicationContainer = styled.div`
  margin-left: ${MAX_NAVBAR_WIDTH}px;
  margin-bottom: 50px;
`;

const AdminContainer = styled.div`
  margin-left: 0px;
  margin-bottom: 50px;
`;

function createContainer(admin) {
  if (admin) {
    return AdminContainer;
  } else {
    return ApplicationContainer;
  }
}

export default createContainer;
