import { Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import UserService from "../api/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import CoachService from "../api/services/CoachService";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function BecomeCoachPage() {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const { user: coach } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // call api to become a coach
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const becomeCoach = await CoachService.becomeCoach(coach?.username);
      const updateCoach = await UserService.updateUserInfo(coach);
      if (becomeCoach?.status == 200 && updateCoach?.status == 200) {
        alert("Congratulation !!! You have become a coach");
        navigate("/", { replace: true });
      } else {
        alert("You failed to become a coach");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...coach, [name]: value }));
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Header />
      <div
        style={{
          position: "relative",
          top: "70px",
          width: "50%",
        }}
      >
        <h2 className="text-center">Become a coach</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              id="description"
              name="description"
              type="text"
              placeholder="Describe yourself why people should choose you"
              value={coach?.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              id="price"
              name="price"
              type="number"
              placeholder="Enter your price"
              value={coach?.price || 0}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check // prettier-ignore
              type="checkbox"
              id={`default-${"asdf"}`}
              label="I agree with ProChicken's privacy policy"
              value={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            />
          </Form.Group>

          <Button
            className="w-100 mt-3"
            variant="primary"
            type="button"
            onClick={handleSubmit}
            disabled={!acceptedPrivacy}
          >
            Become a coach
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BecomeCoachPage;
