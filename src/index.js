import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(Reducers)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
