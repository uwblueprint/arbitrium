import React, { Component } from "react";
import styled from "styled-components";
import UserDisplay from "./UserDisplay";

export const HEADER_HEIGHT = 56;

const Container = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;

  background: #000000;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const AppName = styled.div`
  display: inline-block;
  margin-left: 32px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  letter-spacing: 2px;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 28px;
  color: #ffffff;
`;

const UserDisplayWrapper = styled.div`
  margin-left: auto;
  height: 28px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
`;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <BodyWrapper>
          <AppName>arbitrium</AppName>
          <UserDisplayWrapper>
            <UserDisplay />
          </UserDisplayWrapper>
        </BodyWrapper>
      </Container>
    );
  }
}
