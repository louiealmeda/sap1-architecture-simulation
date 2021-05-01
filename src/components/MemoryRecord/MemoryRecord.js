import React from 'react';
import PropTypes from 'prop-types';
import './MemoryRecord.scss';
import { Box, makeStyles } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';



const MemoryRecord = ({address, value, isCurrentInstruction, isActive }) => {
  
  if(address === "..."){
    return (
      <Box className="MemoryRecord placeholder" data-testid="MemoryRecord">
        {/* <Box p={2} bgcolor={blue[100]} width="25px">{(address + "").padStart(2,"0")}</Box> */}
        <Box p={1} flex="1">...</Box>
      </Box>
    )
  }

  return (
    <Box className="MemoryRecord" data-testid="MemoryRecord" isActiveInstruction={!!isCurrentInstruction+""} isActive={!!isActive+""}>
      {/* Current: {JSON.stringify(isCurrentInstruction)} <br></br>
      IsActive: {JSON.stringify(isActive)} */}
      <Box p={2} bgcolor={blue[100]} width="25px">{(address + "").padStart(2,"0")}</Box>
      <Box p={2}>{value}</Box>
    </Box>
  )
};

MemoryRecord.propTypes = {};

MemoryRecord.defaultProps = {};

export default MemoryRecord;
