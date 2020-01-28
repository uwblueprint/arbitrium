import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Header from "./Components/Header/Header";
import Header2 from "./Components/Header/Header2";
import Footer from "./Components/Footer/Footer";
import Container from "./Components/Container/Container";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import ApplicationsTable from "./Components/List/ApplicationList/ApplicationsTable";
import Comparison from "./Components/Comparison/Comparison";
import { AuthProvider } from "./Authentication/Auth";

import StackedRankings from "./Components/StackedRankings/StackedRankings";
import Login from "./Authentication/login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import moment from "moment";
import {
  loadApplications,
  loadReviews,
  loadStackedRankings
} from "./Actions/index";
import theme from "./theme";
import { history } from "./Store";
import "./App.css";
import PrivateRoute from "./Authentication/PrivateRoute";
//import './App.css';

//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
const proxy =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER
    : "http://localhost:4000";
//const proxy = "http://localhost:4000";

//Are we using this?
const browserHistory = createBrowserHistory();

//const currentRoute = withRouter(props => <)

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Loading applications on app load...");
    //this process is being done here since multiple components require the same applications data
    this.getAllApplicationsAPI().then(res => {
      console.log(res);
      this.props.loadApplications(res);
    });
  }

  onAuthStateChange = async currentUser => {
    if (currentUser != false) {
      this.getAllReviewsAPI(currentUser).then(res => {
        this.props.loadReviews(res);
      });
      this.getAllStackingsAPI(currentUser)
        .then(res => {
          console.log(res);
          this.props.loadStackedRankings(res);
        })
        .catch(e => {
          console.log(e);
        });
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

  getAllReviewsAPI = async user => {
    const token = await user.getIdToken();
    const response = await fetch(proxy + `/api/ratings/${user.uid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`
      }
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  postUserAPI = async param => {
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

  getAllStackingsAPI = async user => {
    const response = await fetch(proxy + `/api/stackings/${user.uid}`, {
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

  /*
  applicationId:
  userId: "insecure"
  rating:
  comments:
  lastReviewed:
  questionList:
  */

  getWrappedComponent = (props, ApplicationComponent) => {
    const WrappedComponent = (
      <ApplicationComponent
        //Passing the applications as a prop
        history={history}
        applications={this.props.applications.applications}
        //add common props here
        {...props}
      />
    );
    return WrappedComponent;
  };

  //wraps common prop under given componenent (likely that many components wll require common props)
  render() {
    /*
    applicationId:
    userId: "insecure"
    rating:
    comments:
    lastReviewed:
    questionList:
    */
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
                        path="/"
                        component={Home}
                      ></PrivateRoute>
                      <PrivateRoute
                        exact={true}
                        path="/applications"
                        component={props =>
                          this.getWrappedComponent(props, ApplicationsTable)
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
                        path="/comparisons/:organizationId"
                        component={Comparison}
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/rankings"
                        component={StackedRankings}
                      ></PrivateRoute>
                    </Switch>
                  </Container>
                </>
              </ConnectedRouter>
            </AuthProvider>
            <Footer getQuestionsAPI={this.getQuestionsAPI} />
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

const mapDispatchToProps = dispatch => ({
  loadApplications: payload => dispatch(loadApplications(payload)),
  loadReviews: payload => dispatch(loadReviews(payload)),
  loadStackedRankings: payload => dispatch(loadStackedRankings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
