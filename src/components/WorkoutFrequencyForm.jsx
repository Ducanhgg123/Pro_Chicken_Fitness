import React from "react";
import "../styles/WorkoutFrequency.css";
import { useDispatch, useSelector } from "react-redux";
import { chooseDaysPerWeek, toggleDate } from "../redux/frequencyWorkoutSlice";

const WorkoutFrequencyForm = ({ previousForm, nextForm }) => {
  const { daysPerWeek, daysInWeek } = useSelector(
    (state) => state.workoutFrequency
  );
  const dispatch = useDispatch();

  const handleDaysPerWeekChange = (event) => {
    dispatch(chooseDaysPerWeek({ daysPerWeek: event.target.value }));
  };

  const handleDaySelection = (idx) => {
    dispatch(toggleDate({ idx }));
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

          <h4 className="mb-4 text-center py-3 text-white">Days Available</h4>

          <div
            className="btn-group d-flex justify-content-around"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            {daysInWeek.map((day, index) => (
              <React.Fragment key={index}>
                <input
                  type="checkbox"
                  className={`btn-check ${day.chosen}`}
                  id={`btncheck-${day.day.toLowerCase()}`}
                  onChange={() => handleDaySelection(index)}
                />
                <label
                  className="btn"
                  htmlFor={`btncheck-${day.day.toLowerCase()}`}
                  style={{
                    backgroundColor: `${day.chosen ? "#33bbc5" : ""}`,
                    color: `${day.chosen ? "#fff" : "#333"}`,
                  }}
                >
                  {day.day}
                </label>
              </React.Fragment>
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
