import React from 'react';
import PropTypes from 'prop-types';
import './ConBar.scss';
import { Box, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import pins from './pins';

// const activations = [0,1,0,0,0,1,1,0,1];
// const pins2 = [
//   <>C<sub>P</sub></>,
//   <>E<sub>P</sub></>,
//   <>L'<sub>M</sub></>,
//   <>CE'</>,
//   <>L'<sub>I</sub></>,
//   <>E'<sub>I</sub></>,
//   <>L'<sub>A</sub></>,
//   <>E<sub>A</sub></>,
//   <>S<sub>U</sub></>,
//   <>E<sub>U</sub></>,
//   <>L'<sub>B</sub></>,
//   <>L'<sub>O</sub></>,
// ];

const useStyles = makeStyles((theme)=>({
  active: {
    backgroundColor: green[100]
  },
  pins: {
    fontSize: '20px',
    boxShadow: theme.shadows[10]
  },
  t: {
    fontSize: "34px",
    fontWeight: "bold",
    zIndex: 1,
    color: "#F55",
    boxShadow: theme.shadows[10]
  }
}));

const ConBar = () => {

  const classes = useStyles();

  return (
    <Box className="ConBar" data-testid="ConBar" display="flex" flexDirection="row" alignItems="flex-end">
      <Box p={2} bgcolor={red[100]} className={classes.t}>T1</Box>
      <Box className={classes.pins} display="flex" bgcolor="white" flex="1">
        {Object.values(pins.controlPins).map((e,i)=>(
          <Box p={1.5} className={e.val ? classes.active : ''}>{e.display}</Box>
        ))}
      </Box>
    </Box>
  )
};

ConBar.propTypes = {};

ConBar.defaultProps = {};

export default ConBar;