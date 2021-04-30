import React from 'react';
import PropTypes from 'prop-types';
import './Module.scss';
import { Box, makeStyles } from '@material-ui/core';
import Bus from './Bus/Bus'
import styles from '../../styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  root: {
    // flex: "1",
    // overflow: "hidden",
  },
  chip: {
    textShadow: "0px -1px rgb(0 0 0 / 50%), 0px 0px rgb(255 255 255)",
    color: "rgba(255,255,255, 0.9)",
    boxShadow: theme.shadows[4],
    borderRadius: "4px",
    backgroundColor: "white",
    background: "radial-gradient(circle, rgba(102,102,102,1) 30%, rgba(80,80,80,1) 120%)",
    borderTop: "1px solid #AAA",
    borderBottom: "1px solid #222",
    borderLeft: "1px solid #777",
    borderRight: "1px solid #777",
    zIndex: 10,
    cursor: "default",
    "&:hover": styles.highlight
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    color: "white",
    marginBottom: "10px"
  },
  value: {
    textAlign: "center",
    backgroundColor: "#222",
    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(102,102,102,1) 8%, rgba(0,0,0,1) 29%, rgba(24,24,24,1) 54%, rgba(43,43,43,1) 56%, rgba(36,36,36,1) 99%, rgba(66,66,66,1) 100%);",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "3px 7px",
    borderRadius: "3px",
    fontFamily: 'Monaco',
    letterSpacing: "2px",
    boxShadow: "0px 2px 6px rgb(0 0 0 / 30%)",
    cursor: "text",
    "&:hover": styles.highlight
  }
}));

const Module = ({name, size, children, left, right, top, bottom, ...rest}) => {
  const classes = useStyles();

  size = size || 8;
  const value = useSelector(e=>e.values[name]);
  
  let display = value;

  if(isNaN(value)){
    display = "".padStart(size, "X")
  }
  return (
    <Box display="flex" className={classes.root} data-testid="Module" flexDirection="column" {...rest}>
      <Box display="flex" justifyContent="center">{top}</Box>
      <Box display="flex">
        <Box display="flex" flexDirection="column" justifyContent="center">{left}</Box>
        <Box flex="1" p={3} className={classes.chip}>
          <Box className={classes.label}>{children}</Box>
          <Box display="flex" justifyContent="center">
            {/* {display} {value} */}
            <Box display="inline" className={classes.value}>{display.toString(2).padStart(size, "0")}</Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">{right}</Box>
      </Box>
      <Box display="flex" justifyContent="center">{bottom}</Box>
    </Box>
  )
};

Module.propTypes = {};

Module.defaultProps = {};

export default Module;
