import React, { PureComponent } from "react"
import { random, sample } from "lodash"
import Confetti from "react-confetti"

import Problem from "./Problem"

const pop = new Audio("./BotW - Hestu's Dance Pop.flac")

const music = new Audio("./BotW - Hestu's Dance.flac")
music.addEventListener("ended", () => pop.play())

export default class Problems extends PureComponent {
  state = {
    correct: 0,
    statements: [...new Array(this.props.total)].map((_, i) => {
      const operator = sample(this.props.operators)
      const first = random(this.props.min, this.props.max - 1)
      const remainder = random(1, this.props.max - first)

      return `${first} ${operator} ${remainder}`
    })
  }

  componentDidUpdate() {
    const { onSuccess = () => {}, total } = this.props
    const { correct } = this.state

    pop.pause()
    pop.currentTime = 0
    pop.play()

    if (correct === total) {
      music.play()
      onSuccess()
    }
  }

  handleSuccess = () => {
    this.setState({ correct: this.state.correct + 1 })
  }

  render() {
    const { total } = this.props
    const { correct, statements } = this.state
    const success = correct === total

    return (
      <div>
        {statements.map((statement, i) => (
          <Problem
            key={`${i}-${statement}`}
            onSuccess={this.handleSuccess}
            statement={statement}
          />
        ))}
        <hr />
        {correct} out of {total}
        <Confetti
          height={window.innerWidth}
          numberOfPieces={100}
          run={success}
          width={window.innerWidth}
        />
      </div>
    )
  }
}
