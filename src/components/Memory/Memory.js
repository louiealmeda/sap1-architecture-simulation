import React from 'react';
import PropTypes from 'prop-types';
import './Memory.scss';
import { AppBar, Box, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditIcon from '@material-ui/icons/Edit';

import MemoryRecord from '../MemoryRecord/MemoryRecord';
import { buildMemory } from './parsing';
import { useSelector } from 'react-redux';

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
00 LDA 15
01 SUB 14
02 HLT
14 LDA 02
15 1
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
      {toRender.map((e,i)=>{
        if(e === undefined){
          return <MemoryRecord key={i} address="..."></MemoryRecord>;
        }
        
        return <MemoryRecord key={e.address} address={e.address} value={e.display}></MemoryRecord>
      })}
    </>
  )

};

const Memory = () => {

  const mar = useSelector(e=>e.values.mar);
  const pc = useSelector(e=>e.values.pc);

  const memoryItems = useSelector(e=>e.memory);
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
        {/* {renderRecords(mem)} */}
        {
          Object.keys(memoryItems).map((e,i)=>(
            <>
              <MemoryRecord isCurrentInstruction={pc == e} isActive={mar == e} key={e} address={e} value={memoryItems[e].toString(2).padStart(8,"0")}></MemoryRecord>
            </>
          ))
        }
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
