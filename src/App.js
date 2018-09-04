import React, { Component } from "react"
import logo from "./logo.svg"

import "./App.css"
import Problem from "./components/Problem"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dom's Math Exercises</h1>
        </header>

        <h1>Find the Sums</h1>

        <Problem>2 + 3</Problem>
      </div>
    )
  }
}

export default App
