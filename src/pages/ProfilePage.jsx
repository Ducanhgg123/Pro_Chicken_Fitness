import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../redux/userSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import UserService from "../api/services/UserService";

const ProfileUpdatePage = () => {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Existing states
  const [avatar, setAvatar] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [selectedDays, setSelectedDays] = useState(["Monday"]);

  // New states for additional user information
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [weight, setWeight] = useState("");

  // Existing functions remain unchanged

  const handleUsernameChange = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const handleAvatarUpload = (event) => {
    // Your existing logic for avatar upload
  };

  const handleDaysPerWeekChange = (event) => {
    // Your existing logic for days per week change
  };

  const handleDaySelection = (day) => {
    // Your existing logic for day selection
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for form submission, including all the updated data
    console.log("Updated Username:", username);
    console.log("Updated Avatar URL:", avatar);
    console.log("Days per Week:", daysPerWeek);
    console.log("Selected Days:", selectedDays);

    // Log the additional fields
    console.log("Address:", address);
    console.log("DOB:", dob);
    console.log("Email:", email);
    console.log("Full Name:", fullName);
    console.log("Gender:", gender);
    console.log("Height:", height);
    console.log("Phone Number:", phoneNumber);
    console.log("Weight:", weight);
  };

  return (
    // Existing JSX remains unchanged, add input fields for new states
    <div className="container mt-4">
      <Header />
      <div
        style={{
          position: "relative",
          top: "70px",
        }}
      >
        <h2 className="text-center">Profile Update</h2>
        <Form onSubmit={handleSubmit}>
          {/* Existing Form components */}
          {/* ... */}
          {/* Additional fields */}
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>
          {/* ... existing form groups for existing fields */}
          {/* Submit button */}
          <Button className="w-100" variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
