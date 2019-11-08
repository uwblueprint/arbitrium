import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ApplicationsTable from './Components/List/ApplicationList/ApplicationsTable';
import Application from './Components/Application/Application';
import Comparison from './Components/Comparison/Comparison';
import './App.css';

const browserHistory = createBrowserHistory();

function App() {
  return (
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
  );
}

export default App;
