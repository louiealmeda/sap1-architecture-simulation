# SAP 1 Architecture Simulator

This simulator aims to help Educators teach how the SAP 1 Architecture works. This simulator features capabilities to support that goal.

https://sap1-simulator.almeda.io/

## Overview

## Interactive Control Pins
Visually demonstrate how the control pins affects the connections between components.


## Playback controls

Observe how the whole system interact with the memory, and which pins are changed based on the cycle time and instructions.

## Toggle Memory Display

Toggle between readable and binary view. Please note that when showing as MNEMONICS, the data memory values may incorrectly show as instructions. The memory doesn't really know which records are instructions or data.

## Edit Memory and Instruction set

Edit the instruction set and variables using this control. Please make sure to enter your data as binary.
Little validation is done on this part, so ensure that you've entered a valid structure and instructions  

The format should be always be a 4-bit address <space> 8-bit value

```
address value
0000 00001110
```

Supported Instructions are:

```
LDA: 0000
ADD: 0001
SUB: 0010
OUT: 1110
HLT: 1111
```