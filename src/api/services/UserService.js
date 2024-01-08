import AxiosInstance from "../../config/AxiosInstance";

class UserService {
  getAllUsers = async () => {
    try {
      const response = await AxiosInstance.get(`/user/`);
      return response;
    } catch (error) {
      return error;
    }
  };

  getUserRole = async (username) => {
    try {
      const response = await AxiosInstance.get(`/user/roles/${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };
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

  getUserRoles = async (username) => {
    try {
      const response = await AxiosInstance.get(`/user/roles/${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  updateUserInfo = async (user) => {
    try {
      const response = await AxiosInstance.put(`/user/${user?.username}`, user);
      return response;
    } catch (error) {
      return error;
    }
  };

  subcribeCoach = async (username, coachName) => {
    try {
      const response = await AxiosInstance.post("/user/subcribe", {
        username,
        coachName,
      });
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new UserService();
