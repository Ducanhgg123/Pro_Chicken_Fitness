import AxiosInstance from "../../config/AxiosInstance";

class IngredientService {
  getFavoriteIngredient = async () => {
    try {
      const response = await AxiosInstance.get("/ingredient/favourite");
      return response;
    } catch (error) {
      return error;
    }
  };

  getUnfavoriteIngredient = async () => {
    try {
      const response = await AxiosInstance.get("/ingredient/unfavourite");
      return response;
    } catch (error) {
      return error;
    }
  };

  getAllIngredients = async () => {
    try {
      const response = await AxiosInstance.get("/ingredient/");
      return response;
    } catch (error) {
      return error;
    }
  };

  deleteIngredient = async (ingredientId) => {
    try {
      const response = await AxiosInstance.delete(
        `/ingredient/${ingredientId}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  updateIngredient = async (ingredient) => {
    try {
      const response = await AxiosInstance.put(`/ingredient/`, ingredient);
      return response;
    } catch (error) {
      return error;
    }
  };

  createIngredient = async (ingredient) => {
    try {
      const response = await AxiosInstance.post(`/ingredient/`, ingredient);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new IngredientService();
