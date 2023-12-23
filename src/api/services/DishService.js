import AxiosInstance from "../../config/AxiosInstance";

class DishService {
  getAllDishes = async () => {
    try {
      const response = await AxiosInstance.get("dish/");
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new DishService();
