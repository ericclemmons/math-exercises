import { observer } from "mobx-react"
import { withStyles } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import React from "react"
import Slider from "@material-ui/lab/Slider"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Zoom from "@material-ui/core/Zoom"

import { state } from "../State"

export const styles = (theme) => ({
  appBar: {
    borderRadius: theme.spacing.unit / 2,
    transform: "translateY(-50%)"
  },
  flex: {
    flexGrow: 1
  },
  root: {
    position: "relative",
    flexGrow: 1
  },
  setting: {
    marginLeft: theme.spacing.unit * 4
  }
})

export function Settings({ classes }) {
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="default" position="static">
        <Toolbar>
          <Typography className={classes.flex} color="inherit" variant="title">
            Settings
          </Typography>

          <div className={classes.setting}>
            <Typography color="inherit">Lowest Number</Typography>

            <Tooltip
              placement="bottom"
              title={state.min}
              TransitionComponent={Zoom}
            >
              <Slider
                min={1}
                max={state.max - 1}
                onChange={(event, min) => {
                  state.min = min
                }}
                step={1}
                value={state.min}
              />
            </Tooltip>
          </div>

          <div className={classes.setting}>
            <Typography color="inherit">Highest Number</Typography>

            <Tooltip
              placement="bottom"
              title={state.max}
              TransitionComponent={Zoom}
            >
              <Slider
                min={state.min + 1}
                max={100}
                onChange={(event, max) => {
                  state.max = max
                }}
                step={1}
                value={state.max}
              />
            </Tooltip>
          </div>

          <div className={classes.setting}>
            <Typography color="inherit">Number of Problems</Typography>

            <Tooltip
              placement="bottom"
              title={state.total}
              TransitionComponent={Zoom}
            >
              <Slider
                min={6}
                max={60}
                onChange={(event, total) => {
                  state.total = total
                }}
                step={6}
                value={state.total}
              />
            </Tooltip>
          </div>

          <div className={classes.setting}>
            <Typography color="inherit">Operators</Typography>

            <ToggleButtonGroup
              value={state.operators}
              onChange={(operators) => {
                if (!operators) {
                  return false
                }

                state.operators = operators
              }}
            >
              <ToggleButton selected={state.operators.includes("+")} value="+">
                <Typography>+</Typography>
              </ToggleButton>
              <ToggleButton selected={state.operators.includes("-")} value="-">
                <Typography>&minus;</Typography>
              </ToggleButton>
              <ToggleButton selected={state.operators.includes("*")} value="*">
                <Typography>&times;</Typography>
              </ToggleButton>
              <ToggleButton selected={state.operators.includes("/")} value="/">
                <Typography>&divide;</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(observer(Settings))
