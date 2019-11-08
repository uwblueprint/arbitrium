import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Application from './Components/Application/Application';
import Comparison from './Components/Comparison/Comparison';
import './App.css';
import ApplicationList from './Components/List/ApplicationList/ApplicationsTable';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact={true} path="/" component={Home}></Route>
            <Route exact={true} path="/submissions" component={Home}></Route>
            <Route path="/submissions/:organizationId" component={Application}></Route>
            <Route path="/comparisons/:organizationId" component={Comparison}></Route>
          </Switch>
        </Router>
        <Footer/>
      </header>
      <ApplicationList/>
    </div>
  );
}

export default App;
