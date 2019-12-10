import React, {Component} from 'react';
import Menu from './Menu';
import FlowSelector from "../FlowSelector/FlowSelector";

export default class Header2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
              <div className="header2-container">
              <FlowSelector>
                  <button>1. Letter of Interest</button>
                  <button disabled>2. Full Application</button>
              </FlowSelector>
              </div>
        );
    }
}
