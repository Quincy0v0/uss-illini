import React, { Component } from 'react';
import './App.css';
import Index from './IndexPage/Index.js'
import logo from './kraken.png'
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
      <Index/>
      </div>
    );
  }
}

export default App;
