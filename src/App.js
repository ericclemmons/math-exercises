import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import classNames from "classnames"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import React, { Component } from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { version } from "../package.json"

import Problems from "./components/Problems"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d32f2f"
    },
    secondary: {
      main: "#039be5"
    }
  }
})

const styles = (theme) => ({
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
})

export default withStyles(styles)(
  class App extends Component {
    render() {
      const { classes } = this.props

      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Math Exercises
                <Typography variant="caption" color="inherit">
                  v{version}
                </Typography>
              </Typography>
            </Toolbar>
          </AppBar>

          <main>
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
                  I made this simple application for my son to work on his
                  arithmatic. This is the first time he's seen me create
                  something that he can use, and he loved it!
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

            <div className={classNames(classes.layout, classes.cardGrid)}>
              <Problems min={1} max={10} operators={["+"]} total={10} />
            </div>
          </main>

          <footer className={classes.footer}>
            <Typography
              variant="subheading"
              align="center"
              color="textSecondary"
              component="p"
            >
              &copy; 2018 Eric Clemmons
            </Typography>
          </footer>
        </MuiThemeProvider>
      )
    }
  }
)
