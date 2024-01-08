import useIngredientsHook from "../../../hooks/useIngredientsHook";
import {
  byteArrayToDataURL,
  fileToByteArray,
} from "../../../utilities/processImageArray";
import { useState } from "react";

function EditIngredientModal({ ingredient, handleClose }) {
  const { updateIngredientMutation } = useIngredientsHook();
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(ingredient);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileToByteArray(file, function (byteArray) {
      setSelectedFile(byteArray);
    });
  };

  const editIngredient = (e) => {
    const { name, value } = e.target;
    setSelectedIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const res = await updateIngredientMutation.mutateAsync({
      id: selectedIngredient.id,
      name: selectedIngredient.name,
      image: selectedFile ? selectedFile : selectedIngredient.image,
    });
    console.log("res", res);
    handleClose();
  };

  return (
    <div
      className="modal"
      style={{
        display: "block",
      }}
      id="editUserModalAdmin"
      aria-labelledby="editUserModalAdminLabel"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalAdminLabel">
              Edit Ingredient
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div>
                <div className="form-label">Image</div>
                {(selectedIngredient?.image || selectedFile) && (
                  <img
                    style={{
                      width: "50%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    src={
                      selectedFile
                        ? byteArrayToDataURL(selectedFile)
                        : byteArrayToDataURL(selectedIngredient?.image)
                    }
                    alt="thumbnail"
                  />
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label
                    htmlFor="imageInput"
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-image"></i> Edit Image
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    className="visually-hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-user-phonenumber" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="edit-user-phonenumber"
                  value={selectedIngredient?.name}
                  onChange={editIngredient}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditIngredientModal;
