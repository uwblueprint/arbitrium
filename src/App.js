import React, {Component}  from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ApplicationsTable from './Components/List/ApplicationList/ApplicationsTable';
import Application from './Components/Application/Application';
import Comparison from './Components/Comparison/Comparison';
import Container from "./Components/Container/Container";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";

import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";

import theme from "./theme";
import { history } from "./Store";


/*
<div className="App">
  <header className="App-header">
    <Header/>
    <Router history={browserHistory}>
      <Switch>
        <Route exact={true} path="/" component={ApplicationsTable}></Route>
        <Route exact={true} path="/submissions" component={ApplicationsTable}></Route>
        <Route path="/submissions/:organizationId" component={Application}></Route>
        <Route path="/comparisons/:organizationId" component={Comparison}></Route>
      </Switch>
    </Router>
    <Footer/>
  </header>
</div>
*/

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
