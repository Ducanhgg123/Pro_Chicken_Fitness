import { useState } from "react";
import "../styles/PersonalInformation.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteIngredient,
  addUnfavoriteIngredient,
  removeFavoriteIngredient,
  removeUnfavoriteIngredient,
} from "../redux/ingredientsSlice";
import WorkoutFrequencyForm from "../components/WorkoutFrequencyForm";
import ReviewInformationForm from "../components/personal-forms/ReviewInformationForm";

const IngredientItem = ({ isFavoriteForm, item, idx }) => {
  const dispatch = useDispatch();
  const payload = {
    ingredient: item,
    idx,
  };
  const handleIngredients = (e, payload) => {
    if (e.target.checked) {
      if (isFavoriteForm) dispatch(addFavoriteIngredient(payload));
      else dispatch(addUnfavoriteIngredient(payload));
    } else {
      if (isFavoriteForm) dispatch(removeFavoriteIngredient(payload));
      else dispatch(removeUnfavoriteIngredient(payload));
    }
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className={`custom-control-input ${item.chosenState}`}
        onChange={(e) => handleIngredients(e, payload)}
        checked={item.chosenState !== "empty"}
      />
      <label className="h6 custom-control-label">{item.food}</label>
    </div>
  );
};

const FavoriteFoodForm = () => {
  const [form, setForm] = useState(1);
  const nextForm = () => {
    setForm(form + 1);
  };

  const previousForm = () => {
    setForm(form - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const renderForm = () => {
    switch (form) {
      case 1:
        return <FavoriteForm nextForm={nextForm} />;
      case 2:
        return (
          <UnfavoriteForm nextForm={nextForm} previousForm={previousForm} />
        );
      case 3:
        return (
          <WorkoutFrequencyForm
            nextForm={nextForm}
            previousForm={previousForm}
          />
        );
      default:
        return <ReviewInformationForm previousForm={previousForm} />;
    }
  };

  return (
    <div className="container mt-5">
      <div className="w-100">
        <div className="">
          <h2 className="mb-4 text-center">Provide your's favorite food</h2>
          <div className="progress-bar-container">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${form * 25}%` }}
              ></div>
            </div>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

const FavoriteForm = ({ nextForm }) => {
  // State and logic for Form 1
  const { ingredients, favoriteIngredients } = useSelector(
    (state) => state.ingredients
  );

  return (
    <form className="form1">
      <div className="container">
        <div className="row">
          {/* Left Side with Checklist and Search Bar */}
          <div className="col-md-6" id="left-side">
            <h4 className="mb-4 text-center mr-2 ml-2 py-3 text-white">
              Favorite Ingredient
            </h4>
            <div className="input-group mb-3" id="search-bar-left">
              <input
                type="text"
                className="form-control"
                placeholder="Search item..."
              />
              <div className="input-group-append">
                <button className="btn text-white" type="button">
                  Search
                </button>
              </div>
            </div>
            <div className="checkbox-column" id="left-checklist">
              {ingredients.map((item, idx) => (
                <IngredientItem
                  key={`favorite-${idx}`}
                  idx={idx}
                  item={item}
                  isFavoriteForm={true}
                />
              ))}
            </div>
          </div>

          {/* Right Side with Textbox for Checked Items */}
          <div className="col-md-6" id="right-side">
            <h4 className="mb-4 text-center mr-2 ml-2 py-3  text-white">
              Chosen ingredient
            </h4>
            <ul>
              {favoriteIngredients?.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button type="button" className="btn btn-primary" onClick={nextForm}>
          Next
        </button>
      </div>
    </form>
  );
};

const UnfavoriteForm = ({ nextForm, previousForm }) => {
  // State and logic for Form 2
  const { ingredients, unfavoriteIngredients } = useSelector(
    (state) => state.ingredients
  );
  return (
    <div className="form2" style={{ width: "100%" }}>
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-6" id="left-side">
              <h4 className="mb-4 text-center mr-2 ml-2 py-3 text-white">
                Unfavorite Ingredient
              </h4>
              <div className="input-group mb-3" id="search-bar-left">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search item..."
                />
                <div className="input-group-append">
                  <button className="btn text-white" type="button">
                    Search
                  </button>
                </div>
              </div>
              <div className="checkbox-column" id="left-checklist">
                <div>
                  {ingredients?.map((item, idx) => {
                    return (
                      <IngredientItem
                        isFavoriteForm={false}
                        key={`unfavorite-${idx}`}
                        item={item}
                        idx={idx}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-6" id="right-side">
              <h4 className="mb-4 text-center mr-2 ml-2 py-3 text-white">
                Unfavorite ingredient
              </h4>
              <ul>
                {unfavoriteIngredients?.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="btn-container">
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

const Form3 = ({ previousForm, handleFormSubmit }) => {
  const { favoriteIngredients, unfavoriteIngredients } = useSelector(
    (state) => state.ingredients
  );
  return (
    <form onSubmit={handleFormSubmit}>
      <h1 className="text-center">Review your information</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Favorite Ingredients</h3>
          <ul>
            {favoriteIngredients?.map((ingredient) => (
              <li key={`favorite-${ingredient}`}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Unfavorite Ingredients</h3>
          <ul>
            {unfavoriteIngredients?.map((ingredient) => (
              <li key={`unfavorite-${ingredient}`}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={previousForm}
        >
          Previous
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FavoriteFoodForm;
