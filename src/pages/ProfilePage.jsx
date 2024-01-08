import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import Header from "../components/Header";
import moment from "moment";
import UserService from "../api/services/UserService";
import { keyToTextLabel } from "../utilities/renderText";
import Button from "../components/button/Button";

const ProfileUpdatePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userKeys = Object.keys(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic for form submission, including all the updated data
    // console.log("Updated Username:", username);
    // console.log("Updated Avatar URL:", avatar);
    // console.log("Days per Week:", daysPerWeek);
    // console.log("Selected Days:", selectedDays);

    // // Log the additional fields
    // console.log("Address:", address);
    // console.log("DOB:", dob);
    // console.log("Email:", email);
    // console.log("Full Name:", fullName);
    // console.log("Gender:", gender);
    // console.log("Height:", height);
    // console.log("Phone Number:", phoneNumber);
    // console.log("Weight:", weight);
    try {
      const res = await UserService.updateUserInfo(user);
      if (res?.status == 200) {
        dispatch(setUser(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
          {userKeys?.map((userKey, idx) => (
            <Form.Group key={idx} className="mb-3">
              <Form.Label htmlFor={userKey}>
                {userKey in keyToTextLabel ? keyToTextLabel[userKey] : userKey}
              </Form.Label>
              <Form.Control
                id={userKey}
                type={getTypeForInput(userKey)}
                placeholder={`Enter ${userKey}`}
                name={userKey}
                value={`${
                  user[userKey] !== null
                    ? userKey === "dateOfBirth"
                      ? formatDateOfBirth(user[userKey])
                      : user[userKey]
                    : ""
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
          <div className="d-flex justify-content-center my-5">
            <Button
              style={{
                padding: "10px 40px",
                borderRadius: "40px",
              }}
              type="submit"
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
