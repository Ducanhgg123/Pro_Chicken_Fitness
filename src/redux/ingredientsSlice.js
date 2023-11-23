import { createSlice } from "@reduxjs/toolkit";
import ingredientsData from "../ingredients.json";
const initialState = {
  ingredients: ingredientsData,
  favoriteIngredients: [],
  unfavoriteIngredients: [],
};

export const ingredientsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavoriteIngredient: (state, { payload }) => {
      state.favoriteIngredients.push(payload.ingredient.food);
      state.ingredients[payload.idx].chosenState = "favorite";
      console.log("add favorite ingredient");
    },
    removeFavoriteIngredient: (state, { payload }) => {
      state.favoriteIngredients = state.favoriteIngredients.filter(
        (item) => item.food !== payload.ingredient.food
      );
      console.log("remove favorite ingredient");
      state.ingredients[payload.idx].chosenState = "empty";
    },
    addUnfavoriteIngredient: (state, { payload }) => {
      state.unfavoriteIngredients.push(payload.ingredient.food);
      console.log(payload);
      state.ingredients[payload.idx].chosenState = "unfavorite";
    },
    removeUnfavoriteIngredient: (state, { payload }) => {
      state.unfavoriteIngredients = state.unfavoriteIngredients.filter(
        (item) => item.food !== payload.ingredient.food
      );

      state.ingredients[payload.idx].chosenState = "empty";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFavoriteIngredient,
  addUnfavoriteIngredient,
  removeFavoriteIngredient,
  removeUnfavoriteIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
