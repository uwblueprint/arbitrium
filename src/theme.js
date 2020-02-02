import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005EB8"
    },
    secondary: {
      main: "#ECE0FD",
      contrastText: "#005EB8"
    }
  },
  shadows: ["none"]
});

export default theme;
