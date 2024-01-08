import AxiosInstance from "../../config/AxiosInstance";

class DishService {
  getAllDishes = async () => {
    try {
      const response = await AxiosInstance.get("/dish/");
      return response;
    } catch (error) {
      return error;
    }
  };

  getIngredientsOfDish = async (dishId) => {
    try {
      const response = await AxiosInstance.get(`/dish/ingredients/${dishId}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  deleteDish = async (dishId) => {
    try {
      const response = await AxiosInstance.delete(`/dish/${dishId}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  updateDish = async (dish) => {
    try {
      const response = await AxiosInstance.put("/dish/", dish);
      return response;
    } catch (error) {
      return error;
    }
  };

  createDish = async (dishFormData) => {
    try {
      const response = await AxiosInstance.post("/dish/", dishFormData);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new DishService();
