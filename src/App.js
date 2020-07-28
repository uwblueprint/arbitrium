import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Container from "./Components/Container/Container";
import Header from "./Components/Header/Header";
import { initialAppLoad } from "./Actions";
import Login from "./Authentication/Login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import theme from "./theme";
import { history } from "./Store";
import PrivateRoute from "./Authentication/PrivateRoute";
import routes from "./appRoutes";

const AppWrapper = styled.div`
  background-color: #ffffff;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
  font-size: calc(0.3vh + 0.5vw + 10px);
  p {
    color: black;
  }
  color: white;
  margin: 0px;
  padding: 0px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
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
      </AppWrapper>
    </ThemeProvider>
  );
}

//connecting applications to redux

const mapDispatchToProps = { initialAppLoad };

export default connect(null, mapDispatchToProps)(App);
