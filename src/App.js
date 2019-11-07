import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Navigation from './Components/Navigation/Navigation'

import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
      </div>
    </ThemeProvider>
  )
}

export default App
