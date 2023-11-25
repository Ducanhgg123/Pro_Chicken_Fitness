import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const imgUrl =
  "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
function CardCoach() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgUrl} />{" "}
      <Card.Body>
        <Card.Title>Coach Name</Card.Title> {/* Replace with coach's name */}
        <Card.Text>
          Some description or information about the coach.
          {/* Replace with the coach's description */}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Link to="/">
            <Button variant="primary">Subscribe</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCoach;
