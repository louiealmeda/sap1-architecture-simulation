import React from 'react';
import PropTypes from 'prop-types';

import pins from '../../ConBar/pins';
import { Box, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import styles from '../../../styles';

const useStyles = makeStyles((theme)=>({
  root: {
    position: "relative",
    width: "60px",
    cursor: "default",
    // backgroundColor: "red"
    "&>*": {
      padding: "2px 15px 2px 10px"
    },
    "&[direction=left]": {
      "&>*": {
        padding: "2px 8px 2px 15px",
        textAlign: "right"
      }, 
      "&>$wire": {
        padding: "0px",
        left: "0px"
      }
    },
    "&:hover": styles.highlight
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


const Pin = ({value, children, ...rest}) => {
  const classes = useStyles();

  let selected = pins.controlPins[value] || pins.clockPins[value] || {};

  return (
    <div className={classes.root} data-testid="Pin" {...rest}>
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
