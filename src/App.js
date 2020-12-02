import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router";
import { AuthProvider } from "./Authentication/Auth";
import Login from "./Authentication/Login.js";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { history } from "./Store";
import PrivateRoute from "./Authentication/PrivateRoute";
import routes from "./appRoutes";
import ProgramContextProvider from "./Contexts/ProgramContext";

const AppWrapper = styled.div`
  background-color: #ffffff;
  min-height: 10vh;
  min-width: 960px;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
  p {
    color: black;
  }
  margin: 0px;
  padding: 0px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <AuthProvider>
          <ProgramContextProvider>
            <ConnectedRouter history={history}>
              <>
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
                        history={history}
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
              </>
            </ConnectedRouter>
          </ProgramContextProvider>
        </AuthProvider>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
