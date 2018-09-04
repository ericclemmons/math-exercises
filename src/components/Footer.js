import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React from "react"

export default withStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
}))(function Footer({ classes }) {
  return (
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
  )
})
