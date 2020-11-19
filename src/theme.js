import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 0
    },
    MuiCard: {
      elevation: 0
    },
    "MuiTableCell-root": {
      fontSize: 14
    }
  },
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
