import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isCoach } from "../utilities/checkRole";

const imgUrl =
  "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
function CardCoach({ coach, subscribedCoaches }) {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.user);

  const handleSubscribeCoach = () => {
    if (isCoach(userRoles)) {
      alert("You already a coach");
      return;
    }
    if (subscribedCoaches?.username == coach?.username) {
      alert("You have subscribed this coach");
      return;
    }
    if (typeof subscribedCoaches === "object") {
      alert("You can subscribe to only one coach");
      return;
    }
    navigate("/payment", {
      state: {
        coachName: coach?.username,
      },
    });
  };
  return (
    <Card style={{ width: "18rem", padding: 0 }}>
      <Card.Img variant="top" src={coach?.avatar || imgUrl} />{" "}
      <Card.Body>
        <Card.Title>{coach?.username}</Card.Title>{" "}
        {/* Replace with coach's name */}
        <Card.Text>
          {coach?.description} {/* Replace with the coach's description */}
        </Card.Text>
        <div className="d-flex justify-content-center">
          {/* <Link
            to="/payment"
            state={{
              coachName: coach?.username,
            }}
            onClick={handleSubscribeCoach}
          > */}
          <Button variant="primary" onClick={handleSubscribeCoach}>
            Subscribe
          </Button>
          {/* </Link> */}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCoach;
