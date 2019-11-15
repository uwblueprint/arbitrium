import React from 'react';
import logo from './logo.svg';
import './App.css';


//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
//const proxy = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER : "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload (HI).
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

        </a>
      </header>
    </div>
  );
}

export default App;
