import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import index from "./js/index"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
