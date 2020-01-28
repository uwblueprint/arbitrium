import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Navigation from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import Header2 from "./Components/Header/Header2";
import Footer from "./Components/Footer/Footer";
import FlowSelector from "./Components/FlowSelector/FlowSelector";
import Container from "./Components/Container/Container";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import ApplicationsTable from "./Components/List/ApplicationList/ApplicationsTable";
import Comparison from "./Components/Comparison/Comparison";

import StackedRankings from "./Components/StackedRankings/StackedRankings";
import Login from "./Authentication/login.js";
import { AuthProvider } from "./Authentication/Auth";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
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
    this.state = {
      user: false
    };
  }

  componentDidMount() {
    console.log("Loading applications on app load...");
    //this process is being done here since multiple components require the same applications data
    //components that update the fetched data can initiate an update via a POST call, then update the redux store.
    this.getAllApplicationsAPI().then(res => {
      console.log(res);
      this.props.loadApplications(res);
    });

    this.getAllReviewsAPI().then(res => {
      console.log(res);
      this.props.loadReviews(res);
    });

    this.getAllStackingsAPI().then(res => {
      console.log(res);
      this.props.loadStackedRankings(res);
    });
  }

  //various APIs to query database and populate pages with data

  getAllApplicationsAPI = async () => {
      const response = await fetch(proxy+'/api/applications', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

  getAllReviewsAPI = async () => {
      const response = await fetch(proxy+'/api/ratings', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    };

  getAllStackingsAPI = async () => {
      const response = await fetch(proxy+'/api/stackings', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

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

  getAllReviewsAPI = async () => {
    const response = await fetch(proxy + "/api/ratings", {
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

  postUserAPI = async param => {
    const response = await fetch(proxy + "/api/applications", {
      method: "POST",
      body: JSON.stringify({
        username: "greg",
        passwrd: "insecure"
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

  getAllStackingsAPI = async () => {
    const response = await fetch(proxy + "/api/stackings", {
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

  updateReviewAPI = async databody => {
    const response = await fetch(proxy + "/api/ratings", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();
    if (response.status !== 201) {
      console.log(response);
      console.log("Error with posting ratings");
    }

  updateStackedAPI = async (databody) => {
      const response = await fetch(proxy+'/api/stackings', {
          method: 'POST',
          body: JSON.stringify(databody),
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
          },
      })
      const body = await response.json();
      if (response.status !== 201) {
        console.log(response);
        console.log("Error with posting StackedRanking");
      }

      console.log(body);
      return body;
    };

  updateStackedAPI = async databody => {
    const response = await fetch(proxy + "/api/stackings", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const body = await response.json();
    if (response.status !== 201) {
      console.log(response);
      console.log("Error with posting ratings");
    }
    console.log(body);
    return body;
  };

  getWrappedComponent = (props, ApplicationComponent) => {
    const WrappedComponent = (
      <ApplicationComponent
        //Passing the applications as a prop
        applications={this.props.applications.applications}
        history={history}
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
    let comments = []
    comments.push({
      lastReviewed: moment.now(),
      value: "Wow this is really good"
    })
    let review = {
      applicationId: "XXX",
      userId: "YYY",
      rating: 4,
      comments: [
        ["A", "B"],
        ["B", "C"]
      ],
      lastReviewed: "Tomorrow",
      questionList: ["Y", ["G", "J"], "U"]
    };

    //this.updateReviewAPI(review);

    const getWrappedComponent = ApplicationComponent => {
      const WrappedComponent = (
        <ApplicationComponent
          //Passing the applications as a prop
          applications={this.props.applications.applications}
          reviews={this.props.applications.reviews}
          stackedRankings={this.props.applications.stackedRankings}
          //add common props here
        />
      );
      return WrappedComponent;
    };

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <AuthProvider>
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
                        component={props =>
                          this.getWrappedComponent(props, StackedRankings)
                        }
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
