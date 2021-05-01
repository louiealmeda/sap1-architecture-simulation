import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Memory.scss';
import { AppBar, Avatar, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, Slide, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import MemoryRecord from '../MemoryRecord/MemoryRecord';
import { buildMemory } from './parsing';
import { useDispatch, useSelector } from 'react-redux';
import { toggleView, reset } from '../../redux/reducers/pinState'
import SchoolIcon from '@material-ui/icons/School';
import { grey } from '@material-ui/core/colors';

import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';



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
  },
  textarea: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    fontFamily: "Monaco",
    lineHeight: "3em",
    padding: "0px 15px"
  },
  about: {
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    fontSize: "15px",
    "&:hover": {
      backgroundColor: grey[100],
    }
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Memory = () => {

  const [isInfoOpen, setIsInfoOpen] = useState(false);


  const [isEditing, setIsEditing] = useState(false);
  const mar = useSelector(e=>e.values.mar);
  const pc = useSelector(e=>e.values.pc);
  const view = useSelector(e=>e.view);

  const dispatch = useDispatch();
  const memoryItems = useSelector(e=>e.memory);

  const serializedMemory = Object.keys(memoryItems).map((address,i)=>(parseInt(address).toString(2).padStart(4,"0") + " " + memoryItems[address].toString(2).padStart(8,"0"))).join("\n");
  const [customMemory, setCustomMemory] = useState(serializedMemory);

  const mem = buildMemory(initial);
  const classes = useStyles();

  const toggleViewClick = () =>{
    dispatch(toggleView());
  }

  const saveMemory = () => {

    setIsEditing(false);
    
    const mem = {};
    
    customMemory.trim().replace(/ +/g, ' ').split("\n").forEach(e=>{
      const [address, value] = e.split(" ");
      mem[parseInt(address,2)] = parseInt(value,2);
    })
    
    console.log(mem);
    dispatch(reset(mem))
  }

  return (
    <div className={classes.root} data-testid="Memory">
      
      <AppBar position="static" style={{position: "relative"}}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Memory
          </Typography>
          <Box flex="1"/>
          { isEditing ? 
            <Tooltip title="Save">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => saveMemory()}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          :
            <Tooltip title="Edit memory">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
          
          { view === "binary" ? 
            (
              <Tooltip title="Readable view">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleViewClick}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            ) :
            (
              <Tooltip title="Binary view">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleViewClick}>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
            )

          }

        </Toolbar>
      </AppBar>
      { isEditing ? 
      (
        <textarea className={classes.textarea} onChange={(e) => setCustomMemory(e.target.value)}>
          {customMemory}
        </textarea>
      ) : ""
      }
      
      <Box className={classes.scroller}>
        {/* {renderRecords(mem)} */}
        {
          Object.keys(memoryItems).map((e,i)=>(
            <MemoryRecord view={view} isCurrentInstruction={pc == e} isActive={mar == e} key={e} address={e} value={memoryItems[e]}></MemoryRecord>
          ))
        }
        <ButtonBase onClick={()=> setIsInfoOpen(true)} className={classes.about} display="flex" alignItems="center" style={{color: grey[600]}}>
          <SchoolIcon style={{width: "64px", height: "64px", paddingRight: "20px"}}/>
          <Box flex="1" pl="2" style={{textAlign: "left"}}>
            MSCS 2021 <br/>
            <strong>
              Technological University of the Philippines
            </strong>
          </Box>
        </ButtonBase>

        <Dialog
          open={isInfoOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={()=> setIsInfoOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle id="alert-dialog-slide-title">
            SAP 1 Architecture Simulator - Creators
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography variant="h4">About the creators</Typography>
              
              <p>This simulator was a Part of the requirements for completing the Computer Architecture Course for the MSCS Program.</p>

              <Box>
                <Box pt={2} display="flex" alignItems="center">
                  <Avatar alt="Louie Almeda" src="/images/louie.jpg" style={{width: "50px", height: "50px"}} />
                  <Box flex="1" pl={1.5}>
                    <Typography variant="h5">Louie Almeda</Typography>
                    <strong>Senior Full-stack Software Engineer</strong> 
                  </Box>
                </Box>
                <p>
                  Louie has always been passionate with his craft ever since he first exposed himself to coding in high school and later on got involved in Competitive Programming. To this day, he continuously challenges his skills by learning and training himself on leading-edge technologies. He also finds satisfaction through teaching and sharing his expertise and love for technology. 
                </p>
              </Box>

              <Box>
                <Box pt={2} display="flex" alignItems="center">
                  <Avatar alt="Louie Almeda" src="/static/images/avatar/1.jpg" />
                  <Box flex="1" pl={1.5}>
                    <Typography variant="h5">Louie Almeda</Typography>
                    <strong>Senior Full-stack Software Engineer</strong> 
                  </Box>
                </Box>
                <p>
                  Louie has always been passionate with his craft ever since he first exposed himself to coding in high school and later on got involved in Competitive Programming. To this day, he continuously challenges his skills by learning and training himself on leading-edge technologies. He also finds satisfaction through teaching and sharing his expertise and love for technology. 
                </p>
              </Box>

              <Box>
                <Box pt={2} display="flex" alignItems="center">
                  <Avatar alt="Louie Almeda" src="/static/images/avatar/1.jpg" />
                  <Box flex="1" pl={1.5}>
                    <Typography variant="h5">Louie Almeda</Typography>
                    <strong>Senior Full-stack Software Engineer</strong> 
                  </Box>
                </Box>
                <p>
                  Louie has always been passionate with his craft ever since he first exposed himself to coding in high school and later on got involved in Competitive Programming. To this day, he continuously challenges his skills by learning and training himself on leading-edge technologies. He also finds satisfaction through teaching and sharing his expertise and love for technology. 
                </p>
              </Box>

              <Box>
                <Box pt={2} display="flex" alignItems="center">
                  <Avatar alt="Louie Almeda" src="/images/louie.jpg" />
                  <Box flex="1" pl={1.5}>
                    <Typography variant="h5">Louie Almeda</Typography>
                    <strong>Senior Full-stack Software Engineer</strong> 
                  </Box>
                </Box>
                <p>
                  Louie has always been passionate with his craft ever since he first exposed himself to coding in high school and later on got involved in Competitive Programming. To this day, he continuously challenges his skills by learning and training himself on leading-edge technologies. He also finds satisfaction through teaching and sharing his expertise and love for technology. 
                </p>
              </Box>

              <Box>
                <Box pt={2} display="flex" alignItems="center">
                  <Avatar alt="Louie Almeda" src="/static/images/avatar/1.jpg" />
                  <Box flex="1" pl={1.5}>
                    <Typography variant="h5">Louie Almeda</Typography>
                    <strong>Senior Full-stack Software Engineer</strong> 
                  </Box>
                </Box>
                <p>
                  Louie has always been passionate with his craft ever since he first exposed himself to coding in high school and later on got involved in Competitive Programming. To this day, he continuously challenges his skills by learning and training himself on leading-edge technologies. He also finds satisfaction through teaching and sharing his expertise and love for technology. 
                </p>
              </Box>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setIsInfoOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Box p={4}/>
        {/* 
        <Box p={4}/> */}
      </Box>
    </div>
  )
};

Memory.propTypes = {};

Memory.defaultProps = {};

export default Memory;
