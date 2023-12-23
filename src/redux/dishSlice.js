import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dishes: [],
};

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    setDishes: (state, { payload }) => {
      state.dishes = payload;
    },
  },
});

export const { setDishes } = dishSlice.actions;

export default dishSlice.reducer;
