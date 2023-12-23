import AxiosInstance from "../../config/AxiosInstance";

class CalendarService {
  // payload : {
  // username: 'hoa',
  // caloriesPerDay: 1500
  // }
  autoGenerateCalendar = async (payload) => {
    try {
      const response = await AxiosInstance.post("/calendar/generate", payload);
      return response;
    } catch (error) {
      return error;
    }
  };

  getADailyWorkout = async (idDailyWorkout) => {
    try {
      const response = await AxiosInstance.get(
        `/dailyworkout/${idDailyWorkout}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  getCalendaryByUsername = async (username) => {
    try {
      const response = await AxiosInstance.get(`/calendar/${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  updateADailyWorkout = async (dailyWorkout) => {
    console.log("update", dailyWorkout);
    try {
      const response = await AxiosInstance.put("/dailyworkout/", dailyWorkout);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new CalendarService();
