import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Form, Button, Image } from "react-bootstrap"; // Import Bootstrap components

const defaultUserUrl =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
const CoachDetailsPage = () => {
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [username, setUsername] = useState("JohnDoe"); // Replace with actual username
  const [avatar, setAvatar] = useState(""); // Image URL for avatar

  const handleDaysPerWeekChange = (event) => {
    setDaysPerWeek(Number(event.target.value));
  };

  const handleDaySelection = (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAvatarUpload = (event) => {
    // Logic to handle uploading and setting the avatar image
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6">
          <h2>{username}</h2>
          <div className="mb-3">
            {avatar ? (
              <Image src={avatar} alt="Avatar" fluid />
            ) : (
              <Image
                className="img-thumbnail rounded"
                src={defaultUserUrl}
                style={{
                  width: "400px",
                  height: "400px",
                }}
                alt="Avatar"
                fluid
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <h3>Workout Frequency</h3>
          <div className="d-flex flex-column gap-4">
            <div>Days can workout in a week: 3 days</div>
            <div className="mb-3">
              <h3>Available Dates</h3>
              <ul className="list-group">
                {daysOfWeek.map((day, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${index == 1 ? "active" : ""}`}
                    aria-current="true"
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDetailsPage;
