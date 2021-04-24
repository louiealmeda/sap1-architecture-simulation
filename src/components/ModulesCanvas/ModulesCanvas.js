import React from 'react';
import PropTypes from 'prop-types';
import './ModulesCanvas.scss';

import Module from '../Module/Module';
import { Box } from '@material-ui/core';
import Pin from '../Module/Pin/Pin';


const ModulesCanvas = () => (
  <div className="ModulesCanvas" data-testid="ModulesCanvas">
    <Box>
      <Module left={
        <>
          <Pin value="CP"/>
          <Pin value="CLK'"/>
          <Pin value="CLR'"/>
          <Pin value="EP"/>
        </>
      }>Program Counter</Module>
      <Module left={
        <>
          <Pin value="L'M"/>
          <Pin value="CLK"/>
        </>
      }>MAR</Module>
      <Module>RAM</Module>
      <Module>Input Register</Module>
      <Module>Control Unit</Module>
    </Box>
    <Box display="flex">
      <Module flexDirection="row" flex="1" display="flex">Bus</Module>
    </Box>
    <Box>
      <Module>A Register</Module>
      <Module>ALU</Module>
      <Module>B Register</Module>
      <Module>Output Register</Module>
    </Box>
  </div>
);

ModulesCanvas.propTypes = {};

ModulesCanvas.defaultProps = {};

export default ModulesCanvas;
