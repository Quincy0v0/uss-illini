import React, { Component } from 'react';
import Index from './IndexPage/Index.js'
import logo from './kraken.png'

class Header extends Component {
  render() {
    return (
        <header className="App-header">
          <img src={require('./kraken.png')} alt="logo" />
          <h1 className="App-title">Welcome Aboard, Commander!</h1>
        </header>
    );
  }
}

export default Header;
