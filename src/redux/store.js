import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientsReducer from "./ingredientsSlice";
import frequencyWorkoutSlice from "./frequencyWorkoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
    workoutFrequency: frequencyWorkoutSlice,
  },
});
