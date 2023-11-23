import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientsReducer from "./ingredientsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
  },
});
