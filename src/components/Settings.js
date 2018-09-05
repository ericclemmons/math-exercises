import { withStyles } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import React, { PureComponent } from "react"
import Slider from "@material-ui/lab/Slider"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Zoom from "@material-ui/core/Zoom"

export default withStyles((theme) => ({
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
}))(
  class Settings extends PureComponent {
    state = this.props

    componentDidUpdate() {
      const { onChange = () => {} } = this.props

      onChange(this.state)
    }

    handleMin = (event, min) => {
      this.setState({ min })
    }

    handleMax = (event, max) => {
      this.setState({ max })
    }

    handleOperators = (operators) => {
      if (!operators) {
        return false
      }

      this.setState({ operators })
    }

    handleTotal = (event, total) => {
      this.setState({ total })
    }

    render() {
      const { classes } = this.props
      const { min, max, operators, total } = this.state

      return (
        <div className={classes.root}>
          <AppBar className={classes.appBar} color="default" position="static">
            <Toolbar>
              <Typography
                className={classes.flex}
                color="inherit"
                variant="title"
              >
                Settings
              </Typography>

              <div className={classes.setting}>
                <Typography color="inherit">Minimum Value</Typography>

                <Tooltip
                  placement="bottom"
                  title={min}
                  TransitionComponent={Zoom}
                >
                  <Slider
                    min={1}
                    max={max - 1}
                    onChange={this.handleMin}
                    step={1}
                    value={min}
                  />
                </Tooltip>
              </div>

              <div className={classes.setting}>
                <Typography color="inherit">Maximum Sum</Typography>

                <Tooltip
                  placement="bottom"
                  title={max}
                  TransitionComponent={Zoom}
                >
                  <Slider
                    min={min + 1}
                    max={100}
                    onChange={this.handleMax}
                    step={1}
                    value={max}
                  />
                </Tooltip>
              </div>

              <div className={classes.setting}>
                <Typography color="inherit">Number of Problems</Typography>

                <Tooltip
                  placement="bottom"
                  title={total}
                  TransitionComponent={Zoom}
                >
                  <Slider
                    min={5}
                    max={100}
                    onChange={this.handleTotal}
                    step={5}
                    value={total}
                  />
                </Tooltip>
              </div>

              <div className={classes.setting}>
                <Typography color="inherit">Operators</Typography>

                <ToggleButtonGroup
                  value={operators}
                  onChange={this.handleOperators}
                >
                  <ToggleButton selected={operators.includes("+")} value="+">
                    <Typography>+</Typography>
                  </ToggleButton>
                  <ToggleButton selected={operators.includes("-")} value="-">
                    <Typography>-</Typography>
                  </ToggleButton>
                  <ToggleButton selected={operators.includes("*")} value="*">
                    <Typography>*</Typography>
                  </ToggleButton>
                  <ToggleButton selected={operators.includes("/")} value="/">
                    <Typography>/</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      )
    }
  }
)
