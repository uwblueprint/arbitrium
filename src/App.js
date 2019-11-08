import React from 'react'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@material-ui/core/styles'

import Navigation from './Components/Navigation/Navigation'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Application from './Components/Application/Application'
import Comparison from './Components/Comparison/Comparison'

import theme from './theme'

const browserHistory = createBrowserHistory()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
        <Header />
        <Router history={browserHistory}>
          <Switch>
            <Route exact={true} path="/" component={Home}></Route>
            <Route exact={true} path="/submissions" component={Home}></Route>
            <Route
              path="/submissions/:organizationId"
              component={Application}
            ></Route>
            <Route
              path="/comparisons/:organizationId"
              component={Comparison}
            ></Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
