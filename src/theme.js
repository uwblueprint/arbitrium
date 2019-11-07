import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECE0FD',
      contrastText: '#6202EE',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#6202EE',
    },
  },
  shadows: ['none'],
})

export default theme
