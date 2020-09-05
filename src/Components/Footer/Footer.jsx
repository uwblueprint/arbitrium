import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  width: 300px;
  background: white;
  color: blue;
  z-index: 100;
`;

const Tagline = styled.div`
  font-size: 0.7em;
  color: #888888;
`;

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: 0
    };
  }

  render() {
    const madeby = "Made by ";
    return (
      <header>
        <Container>
          <Tagline>
            {" "}
            {madeby}
            <a
              href="https://uwblueprint.org/"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#888888" }}
              target="_blank"
            >
              UW Blueprint
            </a>
          </Tagline>
        </Container>
      </header>
    );
  }
}
