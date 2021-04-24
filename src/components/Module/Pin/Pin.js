import React from 'react';
import PropTypes from 'prop-types';

import pins from '../../ConBar/pins';
import { Box, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme)=>({
  root: {
    position: "relative",
    width: "60px",
    // backgroundColor: "red"
    "&>*": {
      padding: "2px 15px 2px 10px"
    }
  },
  active: {
    backgroundColor: green[200]
  },
  wire: {
    height: "2px",
    padding: "0px",
    width: "15px",
    backgroundColor: "black",
    position: "absolute",
    right: "0px",
    top: "50%",
    opacity: 0.5
  }
}));


const Pin = ({value, children}) => {
  const classes = useStyles();

  let selected = pins.controlPins[value] || pins.clockPins[value] || {};

  return (
    <div className={classes.root} data-testid="Pin">
      <Box className={selected.val ? classes.active : ''}>
        {selected.display}
      </Box>
      <div className={classes.wire}></div>
    </div>
  )
};

Pin.propTypes = {};

Pin.defaultProps = {};

export default Pin;
