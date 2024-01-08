import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ActivityService from "../../api/services/ActivityService";
import { setActivities } from "../../redux/activitySlice";
import CalendarService from "../../api/services/CalendarService";

const AddExercisesModal = ({ show, handleClose }) => {
  const { activities } = useSelector((state) => state.activity);
  const { selectedDailyWorkout } = useSelector((state) => state.dailyWorkout);
  const dispatch = useDispatch();

  const selectedActivities = new Set();
  const alreadyHaveActivities = new Set();
  if (selectedDailyWorkout?.activities.length > 0) {
    for (const activity of selectedDailyWorkout.activities) {
      alreadyHaveActivities.add(activity.id);
    }
  }

  const getActivites = async () => {
    try {
      const res = await ActivityService.getAllActivities();
      if (res?.status == 200) {
        dispatch(setActivities(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeActivity = (e, activity) => {
    if (e.target.checked) {
      selectedActivities.add(activity);
    } else {
      selectedActivities.delete(activity);
    }
  };
  useEffect(() => {
    if (activities?.length == 0) {
      console.log("get");
      getActivites();
    }
  }, []);

  const updateActivities = async () => {
    let activitiesArray = null;
    activitiesArray = Array.from(selectedActivities);
    try {
      const payload = {
        ...selectedDailyWorkout,
        activities: [...selectedDailyWorkout.activities, ...activitiesArray],
      };
      console.log(payload);
      const res = await CalendarService.updateADailyWorkout(payload);
      console.log("updateDishes", res);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose} id="addExcerciseModal">
      <Modal.Header closeButton>
        <Modal.Title id="addExcerciseModalLabel">Add more exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="form-check form-check">
            {activities?.map(
              (activity, index) =>
                !alreadyHaveActivities.has(activity.id) && (
                  <div key={index} className="form-check form-check-inline">
                    <Form.Check
                      inline
                      type="checkbox"
                      id={`checkbox-exercise-${index + 1}`}
                      onChange={(e) => handleChangeActivity(e, activity)}
                    />
                    <Form.Check.Label
                      htmlFor={`checkbox-exercise-${index + 1}`}
                    >
                      <img
                        src="https://t4.ftcdn.net/jpg/00/77/46/11/360_F_77461112_WFAEbGQnlfZDUnJ984ncl44ItgtYw0gJ.jpg"
                        alt="Exercise"
                      />
                      {activity?.name}
                    </Form.Check.Label>
                  </div>
                )
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={updateActivities}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExercisesModal;
