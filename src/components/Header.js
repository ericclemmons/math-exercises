import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React from "react"

import { version } from "../../package.json"

export default function Header() {
  return (
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
  )
}
