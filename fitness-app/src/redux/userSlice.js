import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signup } = counterSlice.actions;

export default counterSlice.reducer;
