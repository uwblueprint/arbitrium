import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005EB8"
    },
    secondary: {
      main: "rgba(0, 94, 184, 0.2)",
      contrastText: "#005EB8"
    }
  },
  shadows: ["none"]
});

export default theme;
