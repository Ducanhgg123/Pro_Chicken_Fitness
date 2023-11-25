import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  daysInWeek: [
    { day: "Monday", chosen: false },
    { day: "Tuesday", chosen: false },
    { day: "Wednesday", chosen: false },
    { day: "Thursday", chosen: false },
    { day: "Friday", chosen: false },
    { day: "Saturday", chosen: false },
    { day: "Sunday", chosen: false },
  ],
  daysPerWeek: 0,
};

export const frequencyWorkoutSlice = createSlice({
  name: "frequency-workout",
  initialState,
  reducers: {
    toggleDate: (state, { payload }) => {
      console.log("toggle date");
      const idx = payload.idx;
      state.daysInWeek[idx].chosen = !state.daysInWeek[idx].chosen;
    },
    chooseDaysPerWeek: (state, { payload }) => {
      state.daysPerWeek = payload.daysPerWeek;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDate, chooseDaysPerWeek } = frequencyWorkoutSlice.actions;

export default frequencyWorkoutSlice.reducer;
