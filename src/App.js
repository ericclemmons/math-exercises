import React, { Component } from "react"
import logo from "./logo.svg"

import Problems from "./components/Problems"

import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dom's Math Exercises</h1>
        </header>

        <h1>Find the Sums</h1>

        <Problems min={1} max={10} operators={["+"]} total={3} />
      </div>
    )
  }
}

export default App
