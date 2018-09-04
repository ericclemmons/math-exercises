import React, { Component } from "react"
import Confetti from "react-dom-confetti"

export default class Problem extends Component {
  state = {
    answer: null,
    correct: null,
    value: null
  }

  static getDerivedStateFromProps(props, state = {}) {
    const { statement } = props
    const answer = new Function(`return ${statement}`)()
    const { value } = state
    const correct = value == answer

    return { answer, correct, value }
  }

  handleChange = event => {
    const { value } = event.target

    this.setState({ value })
  }

  render() {
    const { statement } = this.props
    const { correct, value } = this.state

    const formatted = statement
      .split("")
      .filter(Boolean)
      .map(character => {
        if (character.match(/\d+/)) {
          return <strong>{character}</strong>
        }

        return character
      })

    return (
      <form>
        <fieldset>
          {formatted} = <input autoFocus onChange={this.handleChange} />{" "}
          {value ? (correct ? "🎉" : "🤔") : null}
        </fieldset>

        <div style={{ position: "absolute", left: "50%" }}>
          <Confetti
            active={correct}
            config={{
              angle: 90,
              spread: 90,
              startVelocity: 45,
              elementCount: 50,
              decay: 0.9
            }}
          />
        </div>
      </form>
    )
  }
}