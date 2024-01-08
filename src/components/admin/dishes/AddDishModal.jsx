import { useState } from "react";
import {
  byteArrayToDataURL,
  renderThumbnail,
} from "../../../utilities/processImageArray";
import useIngredientsHook from "../../../hooks/useIngredientsHook";
import { useMutation, useQueryClient } from "react-query";
import DishService from "../../../api/services/DishService";

function AddDishModal({ handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dish, setDish] = useState({
    name: "",
    picture: null,
    totalCalories: 0,
  });
  const queryClient = useQueryClient();
  const { ingredients } = useIngredientsHook();
  const createDishMutation = useMutation({
    mutationFn: (formData) => DishService.createDish(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["dishes"]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleAddSelectedIngredients = (ingredient) => {
    let newSelectedIngredients = [...selectedIngredients];
    if (newSelectedIngredients.includes(ingredient)) {
      newSelectedIngredients = newSelectedIngredients.filter(
        (item) => item.id !== ingredient.id
      );
    } else {
      newSelectedIngredients.push(ingredient);
    }
    setSelectedIngredients(newSelectedIngredients);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", dish.name);
    formData.append("picture", selectedFile ? selectedFile : null);
    formData.append("totalCalories", dish.totalCalories);
    formData.append(
      "ingredients",
      selectedIngredients.map((item) => item.id)
    );
    console.log(formData);
    const res = await createDishMutation.mutateAsync(formData);
    console.log(res);
    handleClose();
  };
  return (
    <div
      className="modal"
      id="addDishModalAdmin"
      style={{
        display: "block",
        overflow: "auto",
      }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addDishModalAdminLabel">
              Add more dish
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column gap-2">
              <div>
                <label htmlFor="add-dish-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="add-dish-name"
                  value={dish?.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Image</p>
                <label
                  htmlFor="add-dish-image"
                  className="form-label btn btn-outline-primary"
                >
                  <i className="bi bi-image"></i>
                </label>
                <input
                  type="file"
                  className="form-control visually-hidden"
                  id="add-dish-image"
                  placeholder="dish image"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div>
                  {selectedFile && (
                    <img
                      src={renderThumbnail(selectedFile)}
                      alt="Selected Adding Dish Image"
                      id="selectedAddingDishImage"
                      className="img-fluid"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
              </div>
              <div>
                <p>Total Calories: {dish?.totalCalories}</p>
              </div>

              <p>Ingredients</p>
              <div className="form-check form-check">
                {ingredients?.map((item, idx) => (
                  <div key={idx} className="form-check form-check-inline">
                    <input
                      className="choose-dish-custom-checkbox d-none"
                      type="checkbox"
                      id={`checkbox-edit-dish-${item.id}`}
                      checked={selectedIngredients.includes(item)}
                      onClick={() => handleAddSelectedIngredients(item)}
                    />
                    <label
                      //   className={`btn btn-light ${
                      //     selectedIngredients.has(item.id) ? "selected" : ""
                      //   }`}
                      htmlFor={`checkbox-edit-dish-${item.id}`}
                    >
                      <img
                        src={
                          item?.picture
                            ? byteArrayToDataURL(item.picture)
                            : "https://t4.ftcdn.net/jpg/00/77/46/11/360_F_77461112_WFAEbGQnlfZDUnJ984ncl44ItgtYw0gJ.jpg"
                        }
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      {item?.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDishModal;
