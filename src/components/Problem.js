import React, { Component } from "react"

export default class Problem extends Component {
  state = {
    answer: null,
    correct: null,
    value: null
  }

  static getDerivedStateFromProps(props, state = {}) {
    const { children } = props
    const answer = new Function(`return ${children}`)()
    const { value } = state
    const correct = value == answer

    return { answer, correct, value }
  }

  handleChange = event => {
    const { value } = event.target

    this.setState({ value })
  }

  render() {
    const { children } = this.props
    const { correct, value } = this.state

    const formatted = children
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
      </form>
    )
  }
}
