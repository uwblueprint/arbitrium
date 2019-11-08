import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import index from "./devtools";
import * as serviceWorker from './serviceWorker';
import store from './Store/index';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

serviceWorker.unregister();
