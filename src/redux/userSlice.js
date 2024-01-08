import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  user: null,
  userRoles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUserRoles: (state, { payload }) => {
      state.userRoles = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRoles, setUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
