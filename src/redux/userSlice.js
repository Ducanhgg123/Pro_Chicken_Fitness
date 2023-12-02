import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state) => {
      state.isLoggedIn = false;
    },
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signup, setUsername } = counterSlice.actions;

export default counterSlice.reducer;
