import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import React, { Component } from "react"
import InputAdornment from "@material-ui/core/InputAdornment"
import Confetti from "react-dom-confetti"

const styles = (theme) => ({})

export default withStyles(styles)(
  class Problem extends Component {
    inputRef = React.createRef()

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

    componentDidUpdate(prevProps, prevState) {
      const { autoFocus, onSuccess = () => {} } = this.props
      const { correct } = this.state
      const { current } = this.inputRef

      // You can only pop once
      if (correct && !prevState.correct) {
        onSuccess(this)
      }

      if (autoFocus && current) {
        current.focus()
      }
    }

    handleChange = (event) => {
      const { value } = event.target

      this.setState({ value })
    }

    render() {
      const { autoFocus, statement } = this.props
      const { correct, value } = this.state

      const formatted = statement
        .split("")
        .filter(Boolean)
        .map((character, i) => {
          if (character.match(/\d+/)) {
            return <strong key={`${i}-${character}`}>{character}</strong>
          }

          return (
            <span key={`${i}-${character}`}>
              &nbsp;
              {(() => {
                if (character === "-") return "−"
                if (character === "*") return "×"
                if (character === "/") return "÷"

                return character
              })()}
              &nbsp;
            </span>
          )
        })

      return (
        <React.Fragment>
          <TextField
            autoFocus={autoFocus}
            disabled={correct}
            error={value ? !correct : false}
            fullWidth
            inputRef={this.inputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  {formatted}
                  &nbsp;&nbsp;=&nbsp;&nbsp;
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  {value ? (correct ? "🎉" : "🤔") : ""}
                </InputAdornment>
              )
            }}
            onChange={this.handleChange}
            readOnly={correct}
          />
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
        </React.Fragment>
      )
    }
  }
)
