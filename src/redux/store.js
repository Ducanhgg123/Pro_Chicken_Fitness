import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientsReducer from "./ingredientsSlice";
import frequencyWorkoutReducer from "./frequencyWorkoutSlice";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  whitelist: ["username"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  ingredients: ingredientsReducer,
  workoutFrequency: frequencyWorkoutReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
