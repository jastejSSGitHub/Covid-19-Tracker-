import { createSlice } from '@reduxjs/toolkit';
export const colorSlice = createSlice({
  name: 'color',
  initialState: {
    IsRedHoverOn: false,
    IsGreenHoverOn: false,
    IsPinkHoverOn: false,
    darkModeOn: false,
    codingProjectsOn: false
  },
  reducers: {
    
    //red gmail 
    redHoveredOn:(state) => {state.IsRedHoverOn = true;}, redHoveredOff: (state) => {state.IsRedHoverOn = false;},
    
    greenHoveredOn: (state) => {state.IsGreenHoverOn = true;}, greenHoveredOff: (state) => {state.IsGreenHoverOn = false;},
    
    //pink airbnb
    pinkHoveredOn: (state) => {state.IsPinkHoverOn = true;}, pinkHoveredOff: (state) => {state.IsPinkHoverOn = false;},
    //pink airbnb
    //darmode on
    darkModeOn: (state) => {state.darkModeOn = true;}, darkModeOff: (state) => {state.darkModeOn = false;},
  },
});

export const {  blueHoveredOn, blueHoveredOff, redHoveredOn , redHoveredOff,
   yellowHoveredOn, yellowHoveredOff, greenHoveredOn,greenHoveredOff,
   orangeHoveredOn,orangeHoveredOff ,darkModeOn, darkModeOff, pinkHoveredOn, pinkHoveredOff} = colorSlice.actions;

//selector
export const RedClicked = (state) => state.color.IsRedHoverOn; //sphvere
export const GreenClicked = (state) => state.color.IsGreenHoverOn; //healthsupps
export const BlackClicked = (state) => state.color.IsPinkHoverOn; //amazon

export const DarkModeIsOn = (state) => state.color.darkModeOn;


export default colorSlice.reducer;
