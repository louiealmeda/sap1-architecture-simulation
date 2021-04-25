import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from '../../../styles';

import pins from '../../ConBar/pins';


const useStyles = makeStyles(()=>({
  root:{
    backgroundColor: "rgba(0,0,0,0.1)",
    // padding: "2px 0px 2px 10px",
    "&:hover": styles.highlight,
    cursor: "default",
    "&[active=true]": {
      backgroundColor: "#555",
      color: "white"
    }
  }
}));

const Bus = ({direction, width, enable, ...rest}) => {
  const classes = useStyles();

  let selected = pins.controlPins[enable] || pins.clockPins[enable] || {};
  // console.log(selected, !!selected.val +"");
  if(direction === "up"){
    return (
      <Box className={classes.root} 
        data-testid="Bus" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        style={{padding: "0px 2px 10px 2px"}}
        active={!!selected.val + ""}
        {...rest}
      >
        <KeyboardArrowUpIcon/>
        {width}
      </Box>
    )
  }

  if(direction === "down"){
    return (
      <Box className={classes.root} 
        data-testid="Bus" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        style={{padding: "10px 2px 0px 2px"}}
        active={!!selected.val + ""}
        {...rest}
      >
        {width}
        <KeyboardArrowDownIcon/>
      </Box>
    )
  }

  if(direction === "left"){
    return (
      <Box 
        style={{padding: "2px 10px 2px 2px", margin: "1px 0px"}} 
        className={classes.root} 
        data-testid="Bus" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        active={!!selected.val + ""}
        {...rest}
      >
        <ChevronLeftIcon/>
        {width}
      </Box>
    )
  }

  return (
    <Box 
      style={{padding: "2px 0px 2px 10px", margin: "1px 0px"}} 
      className={classes.root} 
      data-testid="Bus" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      active={!!selected.val + ""}
      {...rest}
    >
      {width}
      <ChevronRightIcon/>
    </Box>
  )
};

Bus.propTypes = {

};

Bus.defaultProps = {};

export default Bus;
