import React, { Component } from 'react';
import './App.css';
import Index from './IndexPage/Index.js'
import logo from './kraken.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./kraken.png')} alt="logo" />
          <h1 className="App-title">Welcome Aboard, Commander!</h1>
        </header>
          <Index/>
      </div>
    );
  }
}

export default App;
