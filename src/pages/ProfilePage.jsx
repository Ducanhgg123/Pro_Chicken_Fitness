import { Button, Form, Image } from "react-bootstrap";
import "../styles/ProfilePage.css";
import { useState } from "react";

const ProfileUpdatePage = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [avatar, setAvatar] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [selectedDays, setSelectedDays] = useState(["Monday"]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission, like sending updated data to the server
    console.log("Updated Username:", username);
    console.log("Updated Avatar URL:", avatar);
    console.log("Days per Week:", daysPerWeek);
    console.log("Selected Days:", selectedDays);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Profile Update</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="h4">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group controlId="formAvatar" className="mb-3">
          <Form.Label className="h4">Avatar URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter avatar URL"
            onChange={handleAvatarUpload}
          />
          {avatar && <Image src={avatar} alt="Avatar" fluid className="mt-2" />}
        </Form.Group>

        <Form.Group controlId="formRange" className="mb-3 d-flex flex-column">
          <Form.Label>Days per Week: {daysPerWeek}</Form.Label>
          <div className="w-50">
            <input
              type="range"
              min="0"
              max="7"
              value={daysPerWeek}
              onChange={handleDaysPerWeekChange}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Dates</Form.Label>
          {daysOfWeek.map((day, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              id={`day-${day}`}
              label={day}
              checked={selectedDays.includes(day)}
              onChange={() => handleDaySelection(day)}
            />
          ))}
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileUpdatePage;
