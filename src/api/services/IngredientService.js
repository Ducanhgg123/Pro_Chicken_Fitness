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
}

export default new IngredientService();
