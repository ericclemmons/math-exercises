import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React from "react"

export default withStyles((theme) => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
}))(function Hero({ classes }) {
  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          variant="display3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Simple Math Exercises with React
        </Typography>
        <Typography
          variant="title"
          align="center"
          color="textSecondary"
          paragraph
        >
          I made this simple application for my son to work on his arithmatic.
          This is the first time he's seen me create something that he can use,
          and he loved it!
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button
                href="https://github.com/ericclemmons/math-exercises"
                variant="contained"
                color="secondary"
              >
                View Source on GitHub
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="https://twitter.com/ericclemmons"
                variant="outlined"
                color="secondary"
              >
                Follow Me on Twitter
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
})
