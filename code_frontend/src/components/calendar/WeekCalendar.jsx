import { useEffect, useState } from "react";
import AddFoodModal from "./AddFoodModal";
import MealPlanContent from "./MealPlanContent";
import WorkoutPlanContent from "./WorkoutPlanContent";
import AddExercisesModal from "./AddExcersisesModal";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CalendarService from "../../api/services/CalendarService";
import {
  addDailyWorkout,
  setDailyWorkoutIds,
  setDailyWorkouts,
  setSelectedDailyWorkout,
} from "../../redux/dailyWorkoutSlice";

const WeekCalendar = () => {
  const [foodShow, setFoodShow] = useState(false);
  const [exercisesShow, setExersisesShow] = useState(false);
  const [caloriesPerDay, setCaloriesPerDay] = useState(1000);
  const { username } = useSelector((state) => state.user);
  const { dailyWorkoutIds, dailyWorkouts, selectedDailyWorkout } = useSelector(
    (state) => state.dailyWorkout
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const getDailyWorkouts = async () => {
      dispatch(setDailyWorkouts([]));
      try {
        for (const dailyWorkoutId of dailyWorkoutIds) {
          const dailyWorkoutRes = await CalendarService.getADailyWorkout(
            dailyWorkoutId
          );
          if (dailyWorkoutRes?.status == 200) {
            dispatch(addDailyWorkout(dailyWorkoutRes.data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dailyWorkoutIds?.length > 0) {
      getDailyWorkouts();
    }
  }, []);

  const handleCloseFood = () => {
    setFoodShow(false);
  };

  const handleOpenFood = (dailyWorkout) => {
    dispatch(setSelectedDailyWorkout(dailyWorkout));
    setFoodShow(true);
  };

  const handleCloseExcersises = () => {
    setExersisesShow(false);
  };
  const handleOpenExercises = (dailyWorkout) => {
    dispatch(setSelectedDailyWorkout(dailyWorkout));
    setExersisesShow(true);
  };
  const autoGenerateDailyWorkout = async () => {
    dispatch(setDailyWorkouts([]));
    try {
      const payload = {
        username,
        caloriesPerDay: Number.parseInt(caloriesPerDay),
      };
      const res = await CalendarService.autoGenerateCalendar(payload);
      console.log("autoGenerateRes", res);
      if (res?.status == 200) {
        dispatch(setDailyWorkoutIds(res.data.dailyWorkouts));

        for (const dailyWorkoutId of res.data.dailyWorkouts) {
          console.log("get", dailyWorkoutId);
          const dailyWorkoutRes = await CalendarService.getADailyWorkout(
            dailyWorkoutId
          );

          if (dailyWorkoutRes?.status == 200) {
            console.log("dailyWorkoutRes", dailyWorkoutRes);
            dispatch(addDailyWorkout(dailyWorkoutRes.data));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("dailyWorkouts", dailyWorkouts);

  return (
    <div className="container-fluid">
      <div className="calendar">
        <div className="row">
          {/* Your loop or logic for days can go here */}
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, idx) => {
            return (
              <div key={day} className="col-md day-blog">
                <h3 className="day-header">{day}</h3>
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary add-event-btn container-fluid"
                    onClick={() => handleOpenExercises(dailyWorkouts[idx])}
                  >
                    <i className="bi bi-plus"></i> Add Exercise
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary add-event-btn container-fluid"
                    onClick={() => handleOpenFood(dailyWorkouts[idx])}
                  >
                    <i className="bi bi-plus"></i> Add Meal
                  </button>
                </div>
                {/* Workout plan content */}
                {dailyWorkouts && (
                  <WorkoutPlanContent
                    workoutActivities={dailyWorkouts[idx]?.activities}
                  />
                )}
                {/* Meal plan content */}
                {dailyWorkouts && (
                  <MealPlanContent dishes={dailyWorkouts[idx]?.dishes} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {selectedDailyWorkout && (
        <AddFoodModal show={foodShow} handleClose={handleCloseFood} />
      )}
      <AddExercisesModal
        show={exercisesShow}
        handleClose={handleCloseExcersises}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Form.Group className="">
          <Form.Control
            value={caloriesPerDay}
            onChange={(e) => setCaloriesPerDay(e.target.value)}
            type="number"
            placeholder="Enter your calories you want per day"
          />
        </Form.Group>
        <button
          style={{
            backgroundColor: "#0984e3",
          }}
          className="btn text-white mt-2"
          onClick={autoGenerateDailyWorkout}
        >
          <i className="bi bi-arrow-clockwise"></i> Auto generate
        </button>
      </div>
    </div>
  );
};

export default WeekCalendar;