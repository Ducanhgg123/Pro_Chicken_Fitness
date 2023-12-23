import { useDispatch, useSelector } from "react-redux";
import {
  addUserIngredient,
  removeUserIngredient,
} from "../../redux/ingredientsSlice";

const IngredientItem = ({ item }) => {
  const { userIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const handleIngredients = (e) => {
    const payload = {
      foodId: item.id,
    };
    if (e.target.checked) {
      dispatch(addUserIngredient(payload));
    } else {
      dispatch(removeUserIngredient(payload));
    }
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        onChange={(e) => handleIngredients(e)}
        checked={userIngredients.includes(item?.id)}
      />

      <label className="h6 custom-control-label">{item?.name}</label>
    </div>
  );
};

export default IngredientItem;
