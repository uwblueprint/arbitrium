import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Container from "./Components/Container/Container";
import Header from "./Components/Header/Header";
import { initialAppLoad } from "./Actions";
import Login from "./Authentication/login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import moment from "moment";
import theme from "./theme";
import { history } from "./Store";
import "./App.css";
import PrivateRoute from "./Authentication/PrivateRoute";
import routes from "./appRoutes";

class App extends Component {
  //Runs whenever a new user logs in

  getWrappedComponent = (props, ApplicationComponent) => {
    const WrappedComponent = (
      <ApplicationComponent
        //Passing the applications as a prop
        history={history}
        //add common props here
        {...props}
      />
    );
    return WrappedComponent;
  };

  mapRoutes = (routes) => {
    const appRoutes = routes.map((route, i) => {
      return (
        <PrivateRoute
          exact={true}
          key={i}
          route={route}
          path={route.path}
          component={(props) =>
            this.getWrappedComponent(props, route.component)
          }
        ></PrivateRoute>
      );
    });
    return appRoutes;
  };

  //wraps common prop under given componenent (likely that many components wll require common props)
  render() {
    const comments = [];
    comments.push({
      lastReviewed: moment.now(),
      value: "Wow this is really good"
    });

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
                      <Route
                        exact={true}
                        path="/login"
                        component={(props) =>
                          this.getWrappedComponent(props, Login)
                        }
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

const mapStateToProps = (state) => ({
  applications: state.applications
});

const mapDispatchToProps = { initialAppLoad };

export default connect(mapStateToProps, mapDispatchToProps)(App);
