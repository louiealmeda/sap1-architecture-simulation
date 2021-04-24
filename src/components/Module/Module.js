import React from 'react';
import PropTypes from 'prop-types';
import './Module.scss';
import { Box, makeStyles } from '@material-ui/core';
import Bus from './Bus/Bus'

const useStyles = makeStyles((theme)=>({
  root: {
    // flex: "1",
    // overflow: "hidden",
  },
  chip: {
    boxShadow: theme.shadows[4],
    borderRadius: "4px",
    backgroundColor: "white",
    background: "radial-gradient(circle, rgba(102,102,102,1) 30%, rgba(80,80,80,1) 120%)",
    borderTop: "1px solid #AAA",
    borderBottom: "1px solid #222",
    borderLeft: "1px solid #777",
    borderRight: "1px solid #777",

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
    boxShadow: "0px 2px 6px rgb(0 0 0 / 30%)"
  }
}));

const Module = ({children, left, right, top, bottom, ...rest}) => {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.root} data-testid="Module" flexDirection="column" {...rest}>
      <Box>{top}</Box>
      <Box display="flex">
        <Box display="flex" flexDirection="column" justifyContent="center">{left}</Box>
        <Box flex="1" p={3} className={classes.chip}>
          <Box className={classes.label}>{children}</Box>
          <Box display="flex" justifyContent="center">
            <Box display="inline" className={classes.value}>010011</Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">{right}</Box>
      </Box>
      <Box>{bottom}</Box>
    </Box>
  )
};

Module.propTypes = {};

Module.defaultProps = {};

export default Module;
