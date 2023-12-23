import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dailyWorkoutIds: [],
  dailyWorkouts: [],
  selectedDailyWorkout: null,
};

export const dailyWorkoutSlice = createSlice({
  name: "daily-workout",
  initialState,
  reducers: {
    setDailyWorkoutIds: (state, { payload }) => {
      state.dailyWorkoutIds = payload;
    },
    addDailyWorkout: (state, { payload }) => {
      state.dailyWorkouts.push(payload);
    },
    setDailyWorkouts: (state, { payload }) => {
      state.dailyWorkouts = payload;
    },
    setSelectedDailyWorkout: (state, { payload }) => {
      state.selectedDailyWorkout = payload;
    },
  },
});

export const {
  setDailyWorkoutIds,
  addDailyWorkout,
  setDailyWorkouts,
  setSelectedDailyWorkout,
} = dailyWorkoutSlice.actions;

export default dailyWorkoutSlice.reducer;
