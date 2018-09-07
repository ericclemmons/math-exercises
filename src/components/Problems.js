import { observer } from "mobx-react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import classNames from "classnames"
import Confetti from "react-confetti"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React from "react"
import Typography from "@material-ui/core/Typography"

import Problem from "./Problem"
import Settings from "./Settings"
import { state } from "../State"

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

export function Problems({ classes }) {
  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <form
        autoComplete="off"
        className={classes.container}
        noValidate
        onReset={() => window.location.reload()}
      >
        <Paper className={classes.paper} elevation={1}>
          <Settings />

          <Typography component="h3" variant="headline" gutterBottom>
            Solve {state.total} Problems
            {state.correct.length ? (
              <Typography variant="caption">
                {state.remaining
                  ? `${state.total - state.correct} left`
                  : "All done!"}
              </Typography>
            ) : null}
          </Typography>

          <Grid container spacing={40}>
            {state.statements.map((statement, i) => (
              <Grid item key={`${i}-${statement}`} sm={4} md={2} lg={2}>
                <Problem
                  autoFocus={i === state.correct.length}
                  onSuccess={() => {
                    state.correct.push(statement)

                    // Yay!
                    new Audio("./BotW - Hestu's Dance Pop.flac").play()

                    // Celebrate!
                    if (!state.remaining) {
                      new Audio("./BotW - Hestu's Dance.flac").play()
                    }
                  }}
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
        run={!state.remaining}
        width={window.innerWidth}
      />
    </div>
  )
}

export default withStyles(styles)(observer(Problems))
