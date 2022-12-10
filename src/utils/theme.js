import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1E2125",
      dark: "#242F3E",
      contrastText: "#FFFFFF",
      iconBackground: "#1162FC",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#FFFFFF",
    },
  },
});

export default theme;
