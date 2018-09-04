import React, { Component } from "react"
import { random } from "lodash"
import logo from "./logo.svg"

import "./App.css"
import Problem from "./components/Problem"

class App extends Component {
  render() {
    const limit = 10
    const problems = [...new Array(10)].map(() => {
      const first = random(1, limit - 1)
      const remainder = random(1, limit - first)

      return <Problem statement={`${first} + ${remainder}`} />
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dom's Math Exercises</h1>
        </header>

        <h1>Find the Sums</h1>

        {problems}
      </div>
    )
  }
}

export default App
