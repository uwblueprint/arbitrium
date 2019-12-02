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
const proxy = "http://localhost:4000";
const browserHistory = createBrowserHistory();

export default class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          user: false
      };

  }

  getQuestionsAPI = async () => {
      const response = await fetch(proxy+'/api/questions', {
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

  componentDidMount() {
    //testing only
    console.log("Got questions");
    this.getQuestionsAPI().then((res) => {
        console.log("Got questions");
        let questions = [];
        res.forEach((question) => {
            console.log(question);
            questions.push(question);
        });
        this.setState({ Questions: questions });
    });
  }

  render() {
    console.log(this.state.Questions);
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
