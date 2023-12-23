import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favoriteIngredients: [],
  unfavoriteIngredients: [],
  userIngredients: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addUserIngredient: (state, { payload }) => {
      state.userIngredients.push(payload.foodId);
      console.log("add user ingredient");
    },
    removeUserIngredient: (state, { payload }) => {
      state.userIngredients = state.userIngredients.filter(
        (item) => item !== payload.foodId
      );
      console.log("remove user ingredient");
    },
    setUnfavoriteIngredients: (state, { payload }) => {
      state.unfavoriteIngredients = payload;
    },
    setFavoriteIngredients: (state, { payload }) => {
      state.favoriteIngredients = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserIngredient,
  removeUserIngredient,
  setUnfavoriteIngredients,
  setFavoriteIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
