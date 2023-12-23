import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  daysPerWeek: 0,
};

export const frequencyWorkoutSlice = createSlice({
  name: "frequency-workout",
  initialState,
  reducers: {
    chooseDaysPerWeek: (state, { payload }) => {
      state.daysPerWeek = payload.daysPerWeek;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chooseDaysPerWeek } = frequencyWorkoutSlice.actions;

export default frequencyWorkoutSlice.reducer;
