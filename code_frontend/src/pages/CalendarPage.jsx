import { useEffect } from "react";
import WeekCalendar from "../components/calendar/WeekCalendar";
import "../styles/Calendar.css";
import CalendarService from "../api/services/CalendarService";
import { useDispatch, useSelector } from "react-redux";
import {
  setDailyWorkoutIds,
  setDailyWorkouts,
} from "../redux/dailyWorkoutSlice";
function CalendarPage() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await CalendarService.getCalendaryByUsername(username);
        if (response?.status == 200) {
          dispatch(setDailyWorkouts([]));
          dispatch(setDailyWorkoutIds(response.data.dailyWorkouts));
        } else {
          dispatch(setDailyWorkoutIds([]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCalendar();
    console.log("get calendar");
  }, []);
  return (
    <div className="calendar-bg vh-100">
      <WeekCalendar />
    </div>
  );
}

export default CalendarPage;
