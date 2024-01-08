import { useEffect, useState } from "react";
import {
  byteArrayToDataURL,
  fileToByteArray,
} from "../../../utilities/processImageArray";
import { useQuery } from "react-query";
import DishService from "../../../api/services/DishService";
import useDishesHook from "../../../hooks/useDishesHook";

function EditDishModal({ dish, handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDish, setSelecteDish] = useState(dish);
  const { updateDishMutation } = useDishesHook();
  const { data: ingredientsOfDish } = useQuery(
    ["ingredients", dish.id],
    async ({ queryKey }) => {
      const [_, dishId] = queryKey;
      const { data } = await DishService.getIngredientsOfDish(dishId);
      return data;
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelecteDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileToByteArray(file, function (byteArray) {
      setSelectedFile(byteArray);
    });
  };
  const handleSubmit = async () => {
    const res = await updateDishMutation.mutateAsync({
      ...selectedDish,
      picture: selectedFile,
    });
    console.log(res);
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
                  value={selectedDish?.name}
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
                  {(selectedDish?.picture || selectedFile) && (
                    <img
                      src={
                        selectedDish?.picture
                          ? byteArrayToDataURL(selectedDish?.picture)
                          : byteArrayToDataURL(selectedFile)
                      }
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
                <p>Total Calories: {selectedDish?.totalCalories}</p>
              </div>

              <p>Ingredients</p>
              <div className="form-check form-check">
                {ingredientsOfDish?.map((item, idx) => (
                  <div key={idx} className="form-check form-check-inline">
                    <input
                      className="choose-dish-custom-checkbox d-none"
                      type="checkbox"
                      id={`checkbox-edit-dish-${item.id}`}
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

export default EditDishModal;
