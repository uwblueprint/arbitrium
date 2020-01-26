import React, {Component, useCallback, useContext } from 'react';
import Menu from './Menu';
import FlowSelector from "../FlowSelector/FlowSelector";
import UserDisplay from './UserDisplay'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
              <div className="header-container">
                  <div className="Arbitrium">Arbitrium</div>
                  <div className="UserDisplay">
                    <UserDisplay/>
                  </div>
              </div>
        );
    }
}
