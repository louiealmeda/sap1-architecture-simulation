import React from 'react';
import PropTypes from 'prop-types';
import './ModulesCanvas.scss';

import Module from '../Module/Module';
import { Box } from '@material-ui/core';
import Pin from '../Module/Pin/Pin';
import Bus from '../Module/Bus/Bus';

const ModulesCanvas = () => (
  <Box className="ModulesCanvas" data-testid="ModulesCanvas" style={{overflow: 'scroll'}} pt={2}>
    <Box>
      <Module 
        left={
          <>
            <Pin value="CP"/>
            <Pin value="CLK'"/>
            <Pin value="CLR'"/>
            <Pin value="EP"/>
          </>
        }

        right={
          <>
            <Bus enable="EP" width={4} direction="right"/>
          </>
        }
        bottom={
          <Box p={1}/>
        }
      >Program Counter</Module>
      <Module 
        left={
          <>
            <Pin value="L'M"/>
            <Pin value="CLK"/>
            <Bus width={4} direction="right"/>
          </>
        }
        right={
          <>
            <Bus enable="L'M" width={4} direction="left"/>
          </>
        }

        bottom={
          <>
            <Bus enable="L'M" width={4} direction="down"/>
          </>
        }
      >MAR</Module>
      <Module
        left={
          <>
            <Bus enable="L'M" width={8} direction="right"/>
            <Pin value="CE'"/>
          </>
        }

        right={
          <>
            <Bus enable="CE'" width={8} direction="right"/>
          </>
        }
        bottom={
          <Box p={1}/>
        }
      >RAM</Module>
      <Module
        left={
          <>
            <Pin value="L'I"/>
            <Pin value="CLK"/>
            <Pin value="CLR"/>
            <Pin value="E'I"/>
          </>
        }

        right={
          <>
            <Bus enable="L'I" width={8} direction="left"/>
            <Bus enable="E'I" width={4} direction="right"/>
          </>
        }

        bottom={
          <>
            <Bus enable="E'I" width={4} direction="down"/>
          </>
        }
      >Input Register</Module>
      <Module
        left={
          <Box style={{visibility: "hidden"}}><Pin/></Box>
        }

        bottom={
          <>
            <Bus enable="E'I" width={12} direction="down"/>
          </>
        }
        right={
          <>
            <Pin value="CLK" direction="left"/>
            <Pin value="CLK'" direction="left"/>
            <Pin value="CLR" direction="left"/>
            <Pin value="CLR'" direction="left"/>
          </>
        }
      >Control Unit</Module>
    </Box>
    <Box display="flex">
      <Module style={{height: "570px"}} flexDirection="row" flex="1" display="flex">Bus</Module>
    </Box>
    <Box>
      <Module
        right={
          <>
            <Pin value="L'A" direction="left"/>
            <Pin value="CLK" direction="left"/>
            <Pin value="EA" direction="left"/>
          </>
        }
        left={
          <>
            <Bus enable="E'A" width={8} direction="left"/>
            <Bus enable="L'A" width={8} direction="right"/>
          </>
        }
        bottom={
          <>
            <Bus enable="E'A" width={8} direction="down"/>
          </>
        }
      >A Register</Module>
      <Module
        right={
          <>
            <Pin value="SU" direction="left"/>
            <Pin value="EU" direction="left"/>
          </>
        }
        left={
          <>
          {/* TODO: Double check enable */}
            <Bus enable="L'B" width={8} direction="left"/> 
          </>
        }
      >ALU</Module>
      <Module
        right={
          <>
            <Pin value="L'B" direction="left"/>
            <Pin value="CLK" direction="left"/>
          </>
        }
        left={
          <>
            <Bus enable="L'B" width={8} direction="right"/>
          </>
        }

        top={
          <>
            <Bus enable="L'B" width={8} direction="up"/>
          </>
        }

        bottom={
          <>
            <Box p={1}/>
          </>
        }
      >B Register</Module>
      <Module
        right={
          <>
            <Pin value="L'O" direction="left"/>
            <Pin value="CLK" direction="left"/>
          </>
        }
        left={
          <>
            <Bus enable="L'O" width={8} direction="right"/>
          </>
        }

        bottom={
          <>
          {/* Todo: Doublecheck */}
            <Bus enable="L'O" width={8} direction="down"/>
          </>
        }
      >Output Register</Module>
      <Module
        right={
          <Box style={{visibility: 'hidden'}}>
            <Pin direction="left"/>
          </Box>
        }
        left={
          <Box style={{visibility: 'hidden'}}>
            <Bus width={8} direction="right"/>
          </Box>
        }
      >Binary Display</Module>
    </Box>
  </Box>
);

ModulesCanvas.propTypes = {};

ModulesCanvas.defaultProps = {};

export default ModulesCanvas;
