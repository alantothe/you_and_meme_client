import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
