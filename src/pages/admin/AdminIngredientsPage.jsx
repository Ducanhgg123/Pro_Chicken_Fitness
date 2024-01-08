import { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import useIngredientsHook from "../../hooks/useIngredientsHook";
import { byteArrayToDataURL } from "../../utilities/processImageArray";
import EditIngredientModal from "../../components/admin/ingredients/EditIngredientModal";
import AddIngredientModal from "../../components/admin/ingredients/AddIngredientModal";

function AdminIngredientsPage() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isAddIngredient, setIsAddIngredient] = useState(false);
  const { ingredients, deleteIngredientMutation } = useIngredientsHook();
  const handleDeleteIngredient = async (ingredient) => {
    if (confirm("Are you sure ?") == true) {
      const res = await deleteIngredientMutation.mutateAsync(ingredient.id);
      console.log("delete ingredient res", res);

      if (res?.status !== 200) {
        alert("This ingredient has been used by another user");
        return;
      }
    }
  };
  const handleCloseEditModal = () => {
    setSelectedIngredient(null);
  };
  const handleCloseAddModal = () => {
    setIsAddIngredient(false);
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">INGREDIENT LIST</h1>
            <button
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
              onClick={() => setIsAddIngredient(true)}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Add
            </button>
          </div>

          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table
                className="table table-hover"
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients?.map((ingredient) => (
                    <tr key={ingredient?.id}>
                      <td>{ingredient?.id}</td>
                      <td>{ingredient?.name}</td>
                      <td>
                        <img
                          src={
                            ingredient?.image
                              ? byteArrayToDataURL(ingredient?.image)
                              : "https://www.vinmec.com/s3-images/20210609_132303_809304_uc-ga-co-tac-dung-g.max-1800x1800.jpg"
                          }
                          style={{
                            maxWidth: "75px",
                            maxHeight: "75px",
                          }}
                          alt="Ingredient image"
                        />
                      </td>
                      <td>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                          onClick={() => setSelectedIngredient(ingredient)}
                        >
                          <i className="bi bi-gear-fill"></i>
                          Edit
                        </button>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                          onClick={() => handleDeleteIngredient(ingredient)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedIngredient && (
                <EditIngredientModal
                  ingredient={selectedIngredient}
                  handleClose={handleCloseEditModal}
                />
              )}
              {isAddIngredient && (
                <AddIngredientModal handleClose={handleCloseAddModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminIngredientsPage;
