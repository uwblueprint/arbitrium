import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Container from "./Components/Container/Container";
import Header from "./Components/Header/Header";
import { initialAppLoad } from "./Actions";
import Login from "./Authentication/login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import theme from "./theme";
import { history } from "./Store";
import "./App.css";
import PrivateRoute from "./Authentication/PrivateRoute";
import routes from "./appRoutes";

function App() {
  //wraps common prop under given componenent (likely that many components wll require common props)
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
                    <Route exact={true} path="/login" component={Login}></Route>
                    <Route
                      exact={true}
                      path="/reset-password"
                      render={() => (
                        <Login initialCardType="passwordResetEmail" />
                      )}
                    ></Route>
                    {routes.map((route, i) => {
                      return (
                        <PrivateRoute
                          exact={true}
                          key={i}
                          route={route}
                          path={route.path}
                          component={route.component}
                        ></PrivateRoute>
                      );
                    })}
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

//connecting applications to redux

const mapDispatchToProps = { initialAppLoad };

export default connect(null, mapDispatchToProps)(App);
