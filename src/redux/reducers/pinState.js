import { createSlice, configureStore } from '@reduxjs/toolkit'


const controlPins = {
  "CP": 1,
  "EP": 0,
  "L'M": 1,
  "CE'": 1,
  "L'I": 1,
  "E'I": 1,
  "L'A": 1,
  "EA": 0,
  "SU": 0,
  "EU": 0,
  "L'B": 1,
  "L'O": 1,
}


const clockPins = {
  "CLK": 0,
  "CLR": 0,
  "CLK'": 0,
  "CLR'": 0,
}


const pinsSlice = createSlice({
  name: 'pins',
  initialState: {
    control: controlPins,
    clock: clockPins,
    value: 0
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
    setClock: ((state, {payload}) => {
      state.clock = payload;
    }),
    setControl: ((state, {payload}) => {
      // console.log(payload);
      state.control = payload;
    })

  }
})

export const { setControl, setClock, incremented, decremented } = pinsSlice.actions


const store = configureStore({
  reducer: pinsSlice.reducer
})

export default store;

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))

// Still pass action objects to `dispatch`, but they're created for us
store.dispatch(incremented())
// {value: 1}
store.dispatch(incremented())
// {value: 2}
store.dispatch(decremented())
// {value: 1}