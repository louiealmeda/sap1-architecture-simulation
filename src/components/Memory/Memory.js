import React from 'react';
import PropTypes from 'prop-types';
import './Memory.scss';
import { AppBar, Box, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditIcon from '@material-ui/icons/Edit';

import MemoryRecord from '../MemoryRecord/MemoryRecord';
import { buildMemory } from './parsing';

const useStyles = makeStyles((theme)=>({
  root: {
    flex: "1",
    overflow: "hidden",
    boxShadow: theme.shadows[2]
  },
  toolbar: {
    padding: "0px",
    paddingLeft: theme.spacing(1),
    backgroundColor: "white",
    color: "black"
  },
  scroller: {
    maxHeight: "100%",
    overflow: "scroll"
  }
}));


const initial = `
00 LDA 99
01 SUB 99
02 HLT
24 LDA 98
99 1
`;

const renderRecords = (records) => {
  
  // const ret = [];
  // let filled = ;

  const toRender = [];

  let skip = false;
  records.forEach((e,i)=>{
    
    if(e !== undefined){
      skip = false;
    }

    if(skip){
      return;
    }

    if(e === undefined){
      skip = true;
    }    

    toRender.push(e);
  })

  return (
    <>
      {toRender.map(e=>{
        if(e === undefined){
          return <MemoryRecord address="..."></MemoryRecord>;
        }
        
        return <MemoryRecord key={e.address} address={e.address} value={e.display}></MemoryRecord>
      })}
    </>
  )

};

const Memory = () => {

  const mem = buildMemory(initial);
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="Memory">
      
      <AppBar position="static" style={{position: "relative"}}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Memory
          </Typography>
          <Box flex="1"/>
          <Tooltip title="Edit memory">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code view">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
      <Box className={classes.scroller}>
        {renderRecords(mem)}

        {/* {[0,1,2,3,4,6,7,8,9,98,99].map(e=>(
          <MemoryRecord key={e} address={e} value={e}></MemoryRecord>
        ))} */}
        <Box p={2}>
          Foobar
          The quick brown fox
        </Box>
        <Box p={4}/>
        <Box p={4}/>
      </Box>
    </div>
  )
};

Memory.propTypes = {};

Memory.defaultProps = {};

export default Memory;
