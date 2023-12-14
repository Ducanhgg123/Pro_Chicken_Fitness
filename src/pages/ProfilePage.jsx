import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import Header from "../components/Header";
import moment from "moment";

const ProfileUpdatePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  const userKeys = Object.keys(user);
  console.log(userKeys);

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

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...user, [name]: value }));
  };
  const getTypeForInput = (userKey) => {
    if (userKey === "dateOfBirth") return "date";
    return "text";
  };

  const formatDateOfBirth = (date) => {
    return moment(date).format("YYYY-MM-DD");
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
          {userKeys?.map((userKey) => (
            <Form.Group key={user[userKey]} className="mb-3">
              <Form.Label htmlFor={userKey}>{userKey}</Form.Label>
              <Form.Control
                id={userKey}
                type={getTypeForInput(userKey)}
                placeholder={`Enter ${userKey}`}
                name={userKey}
                value={`${
                  userKey === "dateOfBirth"
                    ? formatDateOfBirth(user[userKey])
                    : user[userKey]
                }`}
                onChange={handleUserInfoChange}
              />
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={user?.gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
