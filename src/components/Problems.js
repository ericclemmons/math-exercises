import { random, sample } from "lodash"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import classNames from "classnames"
import Confetti from "react-confetti"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React, { PureComponent } from "react"
import Typography from "@material-ui/core/Typography"

import Problem from "./Problem"
import Settings from "./Settings"

const pop = new Audio("./BotW - Hestu's Dance Pop.flac")

const music = new Audio("./BotW - Hestu's Dance.flac")
music.addEventListener("ended", () => pop.play())

const styles = (theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    ...theme.mixins.gutters(),
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

const defaultSettings = {
  min: 1,
  max: 10,
  operators: ["+"],
  total: 10
}

const createStatements = ({ min, max, operators, total }) => {
  return [...new Array(total)].map((_, i) => {
    const operator = sample(operators)
    const first = random(min, max - 1)
    const remainder = random(1, max - first)

    return `${first} ${operator} ${remainder}`
  })
}

export default withStyles(styles)(
  class Problems extends PureComponent {
    state = {
      correct: 0,
      settings: defaultSettings,
      statements: createStatements(defaultSettings)
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

    handleSettings = (settings) => {
      this.setState({ settings })
    }

    handleSuccess = () => {
      this.setState({ correct: this.state.correct + 1 })
    }

    render() {
      const { classes, total } = this.props
      const { correct, settings, statements } = this.state
      const success = correct === total

      return (
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <form
            autoComplete="off"
            className={classes.container}
            noValidate
            onReset={this.handleReset}
          >
            <Paper className={classes.paper} elevation={1}>
              <Settings {...settings} onChange={this.handleSettings} />

              <Typography component="h3" variant="headline" gutterBottom>
                Solve {total} Problems
                {correct ? (
                  <Typography variant="caption">
                    {success ? "All done!" : `${total - correct} left`}
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
