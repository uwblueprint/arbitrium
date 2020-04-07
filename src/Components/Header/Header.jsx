import React, { Component } from "react";
import UserDisplay from "./UserDisplay";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-container">
        <div className="Arbitrium">arbitrium</div>
        <div className="UserDisplay">
          <UserDisplay />
        </div>
      </div>
    );
  }
}
