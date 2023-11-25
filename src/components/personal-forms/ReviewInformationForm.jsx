import { useSelector } from "react-redux";

function ReviewInformationForm({ previousForm }) {
  const { favoriteIngredients, unfavoriteIngredients } = useSelector(
    (state) => state.ingredients
  );
  const { daysInWeek, daysPerWeek } = useSelector(
    (state) => state.workoutFrequency
  );
  console.log(daysPerWeek);
  return (
    <div className="container">
      <h2 className="text-center">Review your personal information</h2>
      <div className="row">
        <div className="col-md-6">
          <h2>Favorite Ingredients</h2>
          <ol className="list-group list-group-numbered">
            {favoriteIngredients.map((ingredient) => (
              <button
                className="list-group-item"
                key={`unfavorite-${ingredient}`}
              >
                {ingredient}
              </button>
            ))}
          </ol>
        </div>
        <div className="col-md-6">
          <h2>Unfavorite Ingredients</h2>

          <ol className="list-group list-group-numbered">
            {unfavoriteIngredients.map((ingredient) => (
              <button
                className="list-group-item"
                key={`unfavorite-${ingredient}`}
              >
                {ingredient}
              </button>
            ))}
          </ol>
        </div>
      </div>
      <div className="row">
        <h2>Your frequency workout</h2>
        <p className="">Number of days you can workout: {daysPerWeek}</p>
        <p>Available date in week you can workout:</p>
        <ul className="list-group w-50">
          {daysInWeek.map((day) => {
            if (day.chosen)
              return (
                <button
                  className="list-group-item list-group-item-action"
                  key={day.day}
                >
                  {" "}
                  {day.day}
                </button>
              );
          })}
        </ul>
      </div>
      <div className="w-50 d-flex mt-4 ">
        <button className="btn btn-secondary" onClick={previousForm}>
          Previous
        </button>
        <button className="btn btn-primary">Submit data</button>
      </div>
    </div>
  );
}

export default ReviewInformationForm;
