import AxiosInstance from "../../config/AxiosInstance";

class CoachService {
  getAllCoaches = async () => {
    try {
      const response = await AxiosInstance.get("/coach/");
      return response;
    } catch (error) {
      return error;
    }
  };

  becomeCoach = async (username) => {
    try {
      const response = await AxiosInstance.post(
        `/coach/becomeCoach/${username}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  getUserCoach = async (username) => {
    try {
      const response = await AxiosInstance.get(`/coach/find/coach/${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  getClientsForCoach = async (coachUsername) => {
    try {
      const response = await AxiosInstance.get(
        `/coach/find/client/${coachUsername}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new CoachService();
