import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activities: [],
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivities: (state, { payload }) => {
      state.activities = payload;
    },
  },
});

export const { setActivities } = activitySlice.actions;

export default activitySlice.reducer;
