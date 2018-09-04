import { random, sample } from "lodash"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Confetti from "react-confetti"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React, { PureComponent } from "react"
import Typography from "@material-ui/core/Typography"

import Problem from "./Problem"

const pop = new Audio("./BotW - Hestu's Dance Pop.flac")

const music = new Audio("./BotW - Hestu's Dance.flac")
music.addEventListener("ended", () => pop.play())

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(
  class Problems extends PureComponent {
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

    handleReset = () => {
      window.location.reload()
    }

    handleSuccess = () => {
      this.setState({ correct: this.state.correct + 1 })
    }

    render() {
      const { classes, total } = this.props
      const { correct, statements } = this.state
      const success = correct === total

      return (
        <div>
          <form
            autoComplete="off"
            className={classes.container}
            noValidate
            onReset={this.handleReset}
          >
            <Paper className={classes.root} elevation={1}>
              <Typography component="h3" variant="headline" gutterBottom>
                Solve {total} Problems
                {correct ? (
                  <Typography variant="caption">
                    {total - correct} left
                  </Typography>
                ) : null}
              </Typography>

              <Grid container spacing={40}>
                {statements.map((statement, i) => (
                  <Grid item key={`${i}-${statement}`} sm={6} md={4} lg={3}>
                    <Problem
                      autoFocus={i === correct}
                      onSuccess={this.handleSuccess}
                      statement={statement}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
            <Button variant="outlined" type="reset">
              Reload
            </Button>
          </form>

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
)
