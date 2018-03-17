import React, { Component } from 'react';
import logo from '../../styles/logo.svg';
import './App.css';
import Clock from '../clock/clock'
import Todo from '../todo/todo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Clock />
        <Todo />
        <div>

        </div>
      </div>
    );
  }
}

export default App;
