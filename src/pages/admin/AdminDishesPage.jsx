import { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import useDishesHook from "../../hooks/useDishesHook";
import { byteArrayToDataURL } from "../../utilities/processImageArray";
import EditDishModal from "../../components/admin/dishes/EditDishModal";
import AddDishModal from "../../components/admin/dishes/AddDishModal";
import { useQueryClient } from "react-query";

const defaultDishUrlImage =
  "https://chatelaine.com/wp-content/uploads/2014/02/Grilled-chicken-on-lime-avocado-quinoa-salad-Ancient-Grains-cookbook-e1391449341464.jpg";

function AdminDishesPage() {
  const { dishes, deleteDishMutation } = useDishesHook();
  const [selectedDish, setSelectedDish] = useState(null);
  const [isAddDish, setIsAddDish] = useState(null);
  const queryClient = useQueryClient();

  const handleDeleteDish = async (dish) => {
    try {
      if (confirm("Are you sure?") == true) {
        const res = await deleteDishMutation.mutateAsync(dish.id);
        if (res?.status !== 200) {
          alert("This dish has been used by other users");
          return;
        }
        queryClient.setQueryData(["dishes"], (prev) => {
          prev.data = prev.data.filter((item) => item.id !== dish.id);
          return prev;
        });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setSelectedDish(null);
  };
  const handleCloseAddDishModal = () => {
    setIsAddDish(false);
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">DISH LIST</h1>
            <button
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
              onClick={() => setIsAddDish(true)}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Add
            </button>
          </div>

          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table className="table table-hover w-100">
                <thead>
                  <tr>
                    <th>DishID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total calories</th>
                    <th>Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes?.map((dish) => (
                    <tr key={dish?.id}>
                      <td>{dish?.id}</td>
                      <td>{dish?.name}</td>
                      <td>
                        <img
                          src={
                            byteArrayToDataURL(dish?.picture) ||
                            defaultDishUrlImage
                          }
                          style={{
                            maxWidth: "75px",
                            maxHeight: "75px",
                          }}
                          alt="Dish image"
                        />
                      </td>
                      <td>{dish?.totalCalories}</td>
                      <td>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                          onClick={() => setSelectedDish(dish)}
                        >
                          <i className="bi bi-gear-fill"></i>
                          Edit
                        </button>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                          onClick={() => handleDeleteDish(dish)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedDish && (
                <EditDishModal dish={selectedDish} handleClose={handleClose} />
              )}
              {isAddDish && (
                <AddDishModal handleClose={handleCloseAddDishModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDishesPage;
