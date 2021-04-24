import React from 'react';
import PropTypes from 'prop-types';
import './MemoryRecord.scss';
import { Box } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';

const MemoryRecord = ({address, value }) => (
  <Box className="MemoryRecord" data-testid="MemoryRecord">
    <Box p={2} bgcolor={blue[100]} width="25px">{address}</Box>
    <Box p={2}>{value}</Box>
  </Box>
);

MemoryRecord.propTypes = {};

MemoryRecord.defaultProps = {};

export default MemoryRecord;
