import { useSelector } from "react-redux";
import UserService from "../../api/services/UserService";
import { useNavigate } from "react-router-dom";

function ReviewInformationForm({ previousForm }) {
  const { userIngredients, favoriteIngredients, unfavoriteIngredients } =
    useSelector((state) => state.ingredients);
  const { username } = useSelector((state) => state.user);
  const userIngredientsSet = new Set(userIngredients);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!username) {
      alert("dont have username");
      return;
    }
    try {
      const res = await UserService.updateUserIngredient({
        username,
        ingredients: userIngredients,
      });
      if (res?.status == 200) {
        navigate("/");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderUserFavoriteIngredients = () => {
    let favoriteFoodIds = [];
    for (const ingredient of favoriteIngredients) {
      if (userIngredientsSet.has(ingredient.id)) {
        favoriteFoodIds.push(ingredient);
      }
    }
    return favoriteFoodIds;
  };

  const renderUserUnFavoriteIngredients = () => {
    let unfavoriteFoodIds = [];
    for (const ingredient of unfavoriteIngredients) {
      if (userIngredientsSet.has(ingredient.id))
        unfavoriteFoodIds.push(ingredient);
    }

    return unfavoriteFoodIds;
  };
  const { daysInWeek, daysPerWeek } = useSelector(
    (state) => state.workoutFrequency
  );
  return (
    <div className="container">
      <h2 className="text-center">Review your personal information</h2>
      <div className="row">
        <div className="col-md-6">
          <h2>Favorite Ingredients</h2>
          <ol className="list-group list-group-numbered">
            {renderUserFavoriteIngredients()?.map((ingredient) => (
              <button className="list-group-item" key={ingredient?.id}>
                {ingredient?.name}
              </button>
            ))}
          </ol>
        </div>
        <div className="col-md-6">
          <h2>Unfavorite Ingredients</h2>

          <ol className="list-group list-group-numbered">
            {renderUserUnFavoriteIngredients()?.map((ingredient) => (
              <button className="list-group-item" key={ingredient?.id}>
                {ingredient?.name}
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
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit data
        </button>
      </div>
    </div>
  );
}

export default ReviewInformationForm;
