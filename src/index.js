import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";
import { SocketContext, socket } from "./context/socket";

const theme = createTheme({
  palette: {
    primary: {
      main: "#513935",
    },
  },
  typography: {
    fontFamily: ["Amaranth", "sans-serif"].join(","),
    h1: {
      color: "#513935",
    },
    button: {
      color: "#513935",
    },
    subtitle2: {
      color: "#513935",
    },
    subtitle1: {
      color: "#513935",
    },
    h6: {
      color: "#513935",
    },
    h5: {
      color: "#513935",
    },
    h4: {
      color: "#513935",
    },
    h3: {
      color: "#513935",
    },
    h2: {
      color: "#513935",
    },
    body1: {
      color: "#513935",
    },
    body2: {
      color: "#513935",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </ThemeProvider>
);
