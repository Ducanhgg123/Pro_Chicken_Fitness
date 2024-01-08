import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import DishService from "../../api/services/DishService";
import { setDishes } from "../../redux/dishSlice";
import { useEffect } from "react";
import CalendarService from "../../api/services/CalendarService";

const AddFoodModal = ({ show, handleClose }) => {
  const { dishes } = useSelector((state) => state.dish);
  const { selectedDailyWorkout } = useSelector((state) => state.dailyWorkout);
  const dispatch = useDispatch();
  const getDishes = async () => {
    try {
      const res = await DishService.getAllDishes();
      if (res?.status == 200) {
        dispatch(setDishes(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectedDishes = new Set();
  const alreadyHaveDishesId = new Set();
  for (const dish of selectedDailyWorkout.dishes) {
    alreadyHaveDishesId.add(dish.id);
  }
  console.log("selected", selectedDailyWorkout);
  console.log(alreadyHaveDishesId);

  const handleChangeDishes = (e, dish) => {
    if (e.target.checked) {
      selectedDishes.add(dish);
    } else {
      selectedDishes.delete(dish);
    }
    console.log(selectedDishes);
  };

  const updateDishes = async () => {
    let dishesArr = null;
    dishesArr = Array.from(selectedDishes);
    try {
      const payload = {
        ...selectedDailyWorkout,
        dishes: [...selectedDailyWorkout.dishes, ...dishesArr],
      };
      console.log(payload);
      const res = await CalendarService.updateADailyWorkout(payload);
      console.log("updateDishes", res);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dishes?.length == 0) {
      console.log("get");
      getDishes();
    }
  }, []);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="addMealModalLabel">Add more meal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dishes?.map(
          (dish, idx) =>
            !alreadyHaveDishesId.has(dish.id) && (
              <Form.Check key={idx}>
                <Form.Check.Input
                  type="checkbox"
                  id="checkbox-meal-1"
                  onClick={(e) => handleChangeDishes(e, dish)}
                />
                <Form.Check.Label htmlFor="checkbox-meal-1">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/77/46/11/360_F_77461112_WFAEbGQnlfZDUnJ984ncl44ItgtYw0gJ.jpg"
                    alt="Food"
                  />
                  {dish?.name}
                </Form.Check.Label>
              </Form.Check>
            )
        )}
        <Button onClick={updateDishes}>Add dishes</Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddFoodModal;
