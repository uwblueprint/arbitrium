import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Application from "./Components/Application/Application";
import ApplicationsTable from "./Components/List/ApplicationList/ApplicationsTable";
import Comparison from "./Components/Comparison/Comparison";
import Container from "./Components/Container/Container";
import Header from "./Components/Header/Header";
import UserManagement from "./Components/Admin/UserManagement";

import { INITIAL_APP_LOAD } from "./Constants/ActionTypes";

import StackedRankings from "./Components/StackedRankings/StackedRankings";
import AllCandidates from "./Components/AllCandidates/AllCandidates";
import Admin from "./Components/Admin/Admin";
import Login from "./Authentication/login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import moment from "moment";
import theme from "./theme";
import { history } from "./Store";
import "./App.css";
import PrivateRoute from "./Authentication/PrivateRoute";

import { getReviewCountAPI } from "./requests/get";

//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
let proxy = "http://localhost:4000";
console.log(process.env.REACT_APP_NODE_ENV);
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  onAuthStateChange = async currentUser => {
    if (currentUser != false) {
      try {
        const applications = await this.getAllApplicationsAPI();
        const reviewCount = await getReviewCountAPI(currentUser);
        this.props.dispatch({
          type: INITIAL_APP_LOAD,
          applications,
          reviewCount
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  //various APIs to query database and populate pages with data

  getAllApplicationsAPI = async () => {
    const response = await fetch(proxy + "/api/applications", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  postUserAPI = async () => {
    const response = await fetch(proxy + "/api/applications", {
      method: "POST",
      body: JSON.stringify({
        username: "greg",
        password: "insecure"
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  getWrappedComponent = (
    props,
    ApplicationComponent,
    fullApplication = false
  ) => {
    const data = fullApplication ? [] : this.props.applications;
    const WrappedComponent = (
      <ApplicationComponent
        //Passing the applications as a prop
        history={history}
        applications={data}
        //add common props here
        {...props}
      />
    );
    return WrappedComponent;
  };

  //wraps common prop under given componenent (likely that many components wll require common props)
  render() {
    let comments = [];
    comments.push({
      lastReviewed: moment.now(),
      value: "Wow this is really good"
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <AuthProvider onAuthStateChange={this.onAuthStateChange}>
              <ConnectedRouter history={history}>
                <>
                  <Header />
                  <Container>
                    <Switch>
                      <PrivateRoute
                        exact={true}
                        path="/applications"
                        component={props =>
                          this.getWrappedComponent(props, ApplicationsTable)
                        }
                      ></PrivateRoute>
                      <PrivateRoute
                        exact={true}
                        path="/applications/full"
                        component={props =>
                          this.getWrappedComponent(
                            props,
                            ApplicationsTable,
                            true
                          )
                        }
                      ></PrivateRoute>
                      <Route
                        exact={true}
                        path="/login"
                        component={Login}
                      ></Route>
                      <PrivateRoute
                        path="/submissions/:organizationId"
                        component={props =>
                          this.getWrappedComponent(props, Application)
                        }
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/submissions/full/:organizationId"
                        component={props =>
                          this.getWrappedComponent(props, Application, true)
                        }
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/comparisons/:organizationId"
                        component={Comparison}
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/rankings"
                        component={StackedRankings}
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/allcandidates"
                        component={props =>
                          this.getWrappedComponent(props, AllCandidates)
                        }
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/admin/user-management"
                        component={UserManagement}
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/admin"
                        component={Admin}
                      ></PrivateRoute>
                      <Redirect to={"/applications"} />
                    </Switch>
                  </Container>
                </>
              </ConnectedRouter>
            </AuthProvider>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

//connecting applications to redux

const mapStateToProps = state => ({
  applications: state.applications,
  reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
