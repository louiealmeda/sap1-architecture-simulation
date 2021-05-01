import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SimulationControls.scss';
import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { useDispatch, useSelector } from 'react-redux';

import {steps} from '../../redux/reducers/circuit'
import {nextStep, previousStep, setState, setStep} from '../../redux/reducers/pinState'
import { Circuit } from '../../redux/reducers/circuit2';


const useStyles = makeStyles((theme)=>({
  toolbar: {
    padding: "0px",
    paddingLeft: theme.spacing(1)
  }
}));

const SimulationControls = () => {
  const classes = useStyles();
  const memory = useSelector(e=>e.memory);
  
  const [steps, setSteps] = useState();
  const [currentVersion, setCurrentVersion] = useState(-1);

  const version = useSelector(e=>e.version);

  const step = useSelector(e=>e.step);
  const dispatch = useDispatch();


  useEffect(()=>{

    if(steps === undefined){
      return;
    }

    dispatch(setState(steps[step]));
  },[step, steps, dispatch]);

  useEffect(()=>{

    // if(steps !== undefined ){
    //   return;
    // }

    if(currentVersion >= version){
      return;
    }

    setCurrentVersion(version);

    const c = new Circuit({memory});

    const states = c.run();
    console.log("Regenerated");
    setSteps(states);
    dispatch(setStep(0));
    // console.log(states);

  },[steps, memory, version, currentVersion, dispatch]);

  const next = () => {
    dispatch(nextStep());
    
  }

  const back = () => {
    dispatch(previousStep());
  }

  return (
    <div className="SimulationControls" data-testid="SimulationControls">
      <AppBar position="relative" style={{position: 'relative'}}>
          <Toolbar variant="dense" className={classes.toolbar}>
            {/* <Typography variant="h6" color="inherit">
              Memory
            </Typography>
            <Box flex="1"/> */}
            <Tooltip title="Back">
              <Button edge="start" color="inherit" aria-label="menu" onClick={back}>
                <UndoIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Next">
              <Button edge="start" color="inherit" aria-label="menu" onClick={next}>
                Step
                <RedoIcon />
              </Button>
            </Tooltip>
            {step}
          </Toolbar>
        </AppBar>
    </div>
  )

};

SimulationControls.propTypes = {};

SimulationControls.defaultProps = {};

export default SimulationControls;
