import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApplicationList from './Components/List/ApplicationList/ApplicationsTable';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <ApplicationList/>
    </div>
  );
}

export default App;
