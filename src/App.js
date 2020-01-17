import React, {Component}  from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Application from "./Components/Application/Application";
import ApplicationsTable from './Components/List/ApplicationList/ApplicationsTable';
import Comparison from "./Components/Comparison/Comparison";

import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { history } from "./Store";
import "./App.css"

//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
const proxy = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER : "http://localhost:4000";
//const proxy = "http://localhost:4000";


//Are we using this?
const browserHistory = createBrowserHistory();

export default class App extends Component {

  constructor(props) {
    super(props);

    //TODO: dummy authentication state
    this.state = {
      isAuthenticated : false
    }
  }

  login = () => {
    this.setState({
      isAuthenticated : true
    });
  }

  logout = () => {
    this.setState({
      isAuthenticated : false
    });
  }

  getQuestionsAPI = async () => {
      const response = await fetch(proxy+'/api/questions', {
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

  getAllApplicationsAPI = async () => {
      const response = await fetch(proxy+'/api/applications', {
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

  postUserAPI = async (param) => {
      const response = await fetch(proxy+'/api/applications', {
          method: 'POST',
          body: JSON.stringify({
              username: "greg",
              passwrd: "insecure"
          }),
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
          },
      })

      const body = await response.json();
      if (response.status !== 201) {
          console.log(response);
          console.log("Error with posting saved-times");
      }

      console.log(body);
      return body;
  }

  componentDidMount() {
    /*
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
    console.log("Got Applications");
    this.getAllApplicationsAPI().then((res) => {
        console.log("Got Applications");
        let apps = [];
        res.forEach((app) => {
            console.log(app);
            apps.push(app);
        });
        this.setState({ Apps: apps });
    });

    console.log("Is post user aPI getting run?");
    this.postUserAPI(null).then((res) => {
        console.log("Done");
    });
    */

  }

  render() {
    const {isAuthenticated} = this.state;

    const ApplicationsTablePage = (props) => {
        return (
            <ApplicationsTable
              getAllApplicationsAPI = {this.getAllApplicationsAPI}
            />
        )
    }

    const PrivateRoute = ({component: Component, ...rest }) => {
      return (<Route {...rest} render={(props) => (
        isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />);
    }

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <ConnectedRouter history={history}>
              <Switch>
                <Route
                  exact={true}
                  path="/login"
                  render={(props) => <Login {...props} login={this.login} logout={this.logout} isAuthenticated={isAuthenticated}/> }
                ></Route>
                <PrivateRoute
                  exact={true}
                  path="/applications"
                  component={ApplicationsTablePage}
                ></PrivateRoute>
                <PrivateRoute
                  path="/submissions/:organizationId"
                  component={Application}
                ></PrivateRoute>
                <PrivateRoute
                  path="/comparisons/:organizationId"
                  component={Comparison}
                ></PrivateRoute>
                <PrivateRoute isAuthenticated={isAuthenticated} texact={true} path="/" component={Home}></PrivateRoute>
              </Switch>
            </ConnectedRouter>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}
