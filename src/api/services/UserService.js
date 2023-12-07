import AxiosInstance from "../../config/AxiosInstance";

class UserService {
  updateUserIngredient = async (payload) => {
    try {
      const response = await AxiosInstance.put(
        "/user/update/ingredient",
        payload
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  getUserbyUsername = async (username) => {
    try {
      const response = await AxiosInstance.get(`/user/${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new UserService();
