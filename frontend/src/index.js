import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

import "../src/index.css";
import "./fonts/Corbel/Corbel-Bold-Italic.ttf";
import "./fonts/Corbel/Corbel-Bold.ttf";
import "./fonts/Corbel/CORBEL.TTF";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
