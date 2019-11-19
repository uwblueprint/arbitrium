import React, {Component}  from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Application from './Components/Application/Application';
import Comparison from './Components/Comparison/Comparison';
import './App.css';

//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
//const proxy = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER : "http://localhost:4000";

const browserHistory = createBrowserHistory();

export default class App extends Component {

  constructor(props) {
      super(props);

  }

  getQuestionsAPI= async () => {
      const response = await fetch('http://localhost:4000/api/questions', {
          method: 'GET',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

  render() {
    console.log(this.getQuestionsAPI);
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
          <Footer
            getQuestionsAPI={this.getQuestionsAPI}
            >
          </Footer>

        </header>
      </div>
    );
  }
}
