import { useState } from "react";
import {
  byteArrayToDataURL,
  fileToByteArray,
} from "../../../utilities/processImageArray";
import { useMutation, useQueryClient } from "react-query";
import IngredientService from "../../../api/services/IngredientService";

function AddIngredientModal({ handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ingredient, setIngredient] = useState({
    name: "",
    picture: null,
  });
  const queryClient = useQueryClient();
  const createIngredientMutation = useMutation({
    mutationFn: (ingredient) => IngredientService.createIngredient(ingredient),
    onSuccess: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileToByteArray(file, (byteArray) => {
      setSelectedFile(byteArray);
    });
  };

  const handleSubmit = async () => {
    const payload = {
      name: ingredient.name,
      image: selectedFile,
    };

    const res = await createIngredientMutation.mutateAsync(payload);
    console.log(res);
    handleClose();
  };
  return (
    <div
      className="modal"
      id="AddIngredientModalAdmin"
      style={{
        display: "block",
        overflow: "auto",
      }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddIngredientModalAdminLabel">
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
                  value={ingredient?.name}
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
                      src={byteArrayToDataURL(selectedFile)}
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

export default AddIngredientModal;
