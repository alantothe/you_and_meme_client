import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
       <Router>
      <App />
    </Router>
  
  
  </ThemeProvider>
  </React.StrictMode>
);
