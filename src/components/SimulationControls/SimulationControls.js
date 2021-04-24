import React from 'react';
import PropTypes from 'prop-types';
import './SimulationControls.scss';
import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const useStyles = makeStyles((theme)=>({
  toolbar: {
    padding: "0px",
    paddingLeft: theme.spacing(1)
  }
}));

const SimulationControls = () => {
  const classes = useStyles();

  return (
    <div className="SimulationControls" data-testid="SimulationControls">
      <AppBar position="relative" style={{position: 'relative'}}>
          <Toolbar variant="dense" className={classes.toolbar}>
            {/* <Typography variant="h6" color="inherit">
              Memory
            </Typography>
            <Box flex="1"/> */}
            <Tooltip title="Back">
              <Button edge="start" color="inherit" aria-label="menu">
                <UndoIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Next">
              <Button edge="start" color="inherit" aria-label="menu">
                Step
                <RedoIcon />
              </Button>
            </Tooltip>

          </Toolbar>
        </AppBar>
    </div>
  )

};

SimulationControls.propTypes = {};

SimulationControls.defaultProps = {};

export default SimulationControls;
