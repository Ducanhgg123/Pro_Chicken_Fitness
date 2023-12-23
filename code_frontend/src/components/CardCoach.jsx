import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const imgUrl =
  "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
function CardCoach({ coach }) {
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
          <Link
            to="/payment"
            state={{
              coachName: coach?.username,
            }}
          >
            <Button variant="primary">Subscribe</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCoach;
