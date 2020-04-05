import React from "react";
import styled from "styled-components";
import Spinner from 'react-spinner-material';

const Wrapper = styled.div`
  margin-top: 148px;
`;

function Admin() {
  return (
  <Wrapper>
    <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
  </Wrapper>
)}
export default Admin;
