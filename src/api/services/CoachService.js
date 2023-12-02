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
}

export default new CoachService();
