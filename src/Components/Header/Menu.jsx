import React, {Component} from 'react';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            </button>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav mr-auto">
                            <li><a href="/"><font color="5F5FC4">RocketCare</font></a></li>
                            <li><a href="/find-time">Find Available Times</a></li>
                            <li><a href="/saved">View Saved Times</a></li>
                            <li><a href="/login">Switch User</a></li>
                            <li><a href="/help">Help</a></li>
                            <li><a href="/client">Client</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
