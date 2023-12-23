import AxiosInstance from "../../config/AxiosInstance";

class ActivityService {
  getAllActivities = async () => {
    try {
      const response = await AxiosInstance.get("workout/");
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ActivityService();
