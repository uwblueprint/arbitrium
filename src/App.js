import React from "react";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";

import Navigation from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Container from "./Components/Container/Container";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import Comparison from "./Components/Comparison/Comparison";

import theme from "./theme";
import { history } from "./Store";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <ConnectedRouter history={history}>
          <>
            <Navigation />
            <Container>
              <Switch>
                <Route exact={true} path="/" component={Home}></Route>
                <Route
                  exact={true}
                  path="/submissions"
                  component={Home}
                ></Route>
                <Route
                  path="/submissions/:organizationId"
                  component={Application}
                ></Route>
                <Route
                  path="/comparisons/:organizationId"
                  component={Comparison}
                ></Route>
              </Switch>
            </Container>
          </>
        </ConnectedRouter>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
