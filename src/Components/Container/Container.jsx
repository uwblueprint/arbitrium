import styled from "styled-components";

const ApplicationContainer = styled.div`
  margin-bottom: 50px;
`;

const AdminContainer = styled.div`
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
