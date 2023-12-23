import React from "react";
import "../styles/WorkoutFrequency.css";
import { useDispatch, useSelector } from "react-redux";
import { chooseDaysPerWeek } from "../redux/frequencyWorkoutSlice";
import { setUser } from "../redux/userSlice";

const WorkoutFrequencyForm = ({ previousForm, nextForm }) => {
  const { daysPerWeek } = useSelector((state) => state.workoutFrequency);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDaysPerWeekChange = (event) => {
    dispatch(
      setUser({
        ...user,
        workoutFrequency: Number.parseInt(event.target.value),
      })
    );
    dispatch(chooseDaysPerWeek({ daysPerWeek: event.target.value }));
  };

  return (
    <div className="form3">
      <form>
        <h3>Workout Frequency</h3>
        <div className="container" id="workout-frequency">
          <h4 className="mb-4 text-center mr-2 ml-2 py-3 text-white">
            Days per Week
          </h4>
          <input
            type="range"
            className="form-range custom-range"
            min="0"
            max="7"
            value={daysPerWeek}
            onChange={handleDaysPerWeekChange}
          />
          <div className="range-labels">
            {[...Array(8).keys()].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        </div>
        <div className="d-flex gap-3 mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={previousForm}
          >
            Previous
          </button>

          <button className="btn btn-primary" onClick={nextForm}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutFrequencyForm;
