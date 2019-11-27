import React, { Component } from 'react'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchOverall,
    fetchApplication,
} from '../../Actions/index'
import Header from "../Header/Header";
import {Route, Router, Switch} from "react-router";
import Home from "../Home/Home";
import Application from "../Application/Application";
import Comparison from "../Comparison/Comparison";
import Footer from "../Footer/Footer";

const browserHistory = createBrowserHistory();

class AsyncApp extends Component {
    constructor(props){
        super(props);
        this.handleNextApplication = this.handleNextApplication.bind(this);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(fetchOverall());
        dispatch(fetchApplication());
    }

    handleNextApplication(){

    }

    render(){
        return (
            <div className="App">
                <Header/>
                <Router history={browserHistory}>
                    <Switch>
                        <Route exact={true} path="/" component={Home}></Route>
                        <Route exact={true} path="/submissions" component={Home}></Route>
                        <Route path="/submissions/:organizationId" component={Application}></Route>
                        <Route path="/comparisons/:organizationId" component={Comparison}></Route>
                    </Switch>
                </Router>
                <Footer/>
            </div>
        )
    }
}

AsyncApp.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(AsyncApp);