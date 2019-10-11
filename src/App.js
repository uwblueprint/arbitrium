import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import './App.css';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact={true} path="/" component={Home}></Route>
          </Switch>
        </Router>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
