import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Container from "./Components/Container/Container";
import Header from "./Components/Header/Header";
import { INITIAL_APP_LOAD } from "./Constants/ActionTypes";
import Login from "./Authentication/login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import moment from "moment";
import theme from "./theme";
import { history } from "./Store";
import "./App.css";
import PrivateRoute from "./Authentication/PrivateRoute";
import routes from "./appRoutes"

const GET = require("./requests/get");

class App extends Component {

  //Runs whenever a new user logs in
  onAuthStateChange = async currentUser => {
    /* eslint-disable-next-line eqeqeq*/
    if (currentUser != false) {
      try {
        const applications = await GET.getAllApplicationsAPI();
        const reviewCount = await GET.getReviewCountAPI(currentUser);

        //Load the initial data into redux
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

  getWrappedComponent = (
    props,
    ApplicationComponent,
  ) => {
    const data = this.props.applications;
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

  mapRoutes = (routes) =>{
    let appRoutes = routes.map(route => {
      return (
        <PrivateRoute
          exact={true}
          route={route}
          path={route.path}
          component={(props) => this.getWrappedComponent(props, route.component)}
          >
        </PrivateRoute>
      )
    })
    return appRoutes;
  }

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
                      <Route
                        exact={true}
                        path="/login"
                        component={(props) => this.getWrappedComponent(props, Login)}
                      ></Route>
                      {this.mapRoutes(routes)}
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
