import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './IndexPage/Index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome Aboard</h1>
        </header>
          <Index/>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
