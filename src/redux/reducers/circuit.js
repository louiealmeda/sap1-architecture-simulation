const pins = {
    "CP": 1,
    "EP": 0,
    "L'M": 0,
    "CE'": 0,
    "L'I": 0,
    "E'I": 0,
    "L'A": 0,
    "EA": 0,
    "SU": 0,
    "EU": 0,
    "L'B": 0,
    "L'O": 0,
    "CLK": 0,
    "CLR": 0,
    "CLK'": 1,
    "CLR'": 1,
}

  
const c = {
    memory: {
        0: 0b0100001,
        1: 0b0000001,
        24: 0b000010,
        99: 0b00000001
    },
    setPins: (pins) => {
        // TODO
    },
    bus: {
        value: 0b0000000,
        setValue: (value) => {
            c.bus.value = value;
            c.mar.execute();
        }
    },
    programCounter: {
        value: 0b00000000,
        execute: () => {
            //return single
            
            if(isActive('EP')){
                c.bus.setValue(c.programCounter.value);
            }
        }
    },
    mar: {
        value: 0,
        execute: () => {
            
            if(isActive("L'M")){
                c.mar.value = c.bus.value;
            }

            c.ram.execute();
        }
    },
    ram: {
        value: 0,
        execute: () => {
            //return single
            c.ram.value = c.memory[c.mar.value];

            if(isActive("CE'")){
                c.bus.setValue(c.ram.value);
            }
        }
    },
    inputRegister: {
        value: 0,
        execute: () => {
            //return single
            // c.ram.value = c.memory[c.mar.value];
            
            if(isActive("L'I")){
                c.ram.value = c.bus.value;
            }

            if(isActive("E'I")){
                c.bus.setValue(c.inputRegister.value);
            }
        }
    },
    controlUnit: {
        value: 0,
        execute: () => {

            const opcode = c.inputRegister.value; // TODO: split binary

        }
    }

}

export const isActive = (pin, sourcePins) => {
    if(pin === undefined){
        return false;
    }
    sourcePins = sourcePins || pins;

    const val = sourcePins[pin];

    //if has prime
    if(pin.indexOf("'") !== -1){
        return !val;
    }

    return val;
}

const executionSequence = [
    c.programCounter.execute,
    c.mar.execute,
    c.ram.execute,
    c.inputRegister.execute,
    c.controlUnit.execute
];

// T1,CP,EP,L'M,CE',L'I,E'I,L'A,EA,SU,EU,L'B,L'O,CLK,CLR,CLK',CLR',pc, mar,ram,ir,cu,areg,alu,breg,outreg,binDis
const steps = [
    {
        t: 1,
        con: [],
        clk: [],
        bus: 0,
        pc: 0,
        ram: 0,
        ir: 0,
        cu: 0,
        areg: 0,
        alu: 0,
        breg: 0,
        outreg: 0,
        binDis: 0,
    }
]