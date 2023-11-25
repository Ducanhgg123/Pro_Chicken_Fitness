import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { convertFileToBytes } from "../utilities/convertImageToByte";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = (name, e) => {
    setUser({ ...user, [name]: e.target.value });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    // Access the selected file from the input
    const file = e.target.files[0];
    // setSelectedFile(convertFileToBytes(file).then((bytes) => bytes));
    setSelectedFile(file);
    console.log(file);
  };
  const handleSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("username", "ducanh");
    formData.append("avatar", selectedFile);
    axios
      .post(
        "http://localhost:8080/api/authentication/login",
        {
          username: "ducanh",
          password: "hello",
        }
        // {
        //   headers: {
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdWNhbmgiLCJleHAiOjE3MDA5MjEwODUsImlhdCI6MTcwMDg4NTA4NX0.qTsxoY68m3nMxsPGyLyQ8gRJervlaeesYQvUFEUrZzE`,
        //   },
        // }
      )
      .then((res) => console.log(res));
  };
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-6">
          <div className="container">
            <div className="row justify-content-center">
              <img
                src="AnhCorgiDeThuong.svg"
                id="anhCorgi"
                width="100%"
                className="img-flulid"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="login-container form-container">
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={(e) => handleChange("username", e)}
                />
              </div>
              <input
                type="file"
                accept="image/*" // Limit accepted file types to images
                onChange={handleFileChange}
              />
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e)}
                />
              </div>

              <div id="signup" className="float-right mb-3">
                <a href="signup.html">Sign Up</a>
              </div>
              <div id="forgotpassword" className="float-left mb-3">
                <a href="passwordrecover.html">Forgot Password?</a>
              </div>

              <div className="container">
                <button type="button" className="btn btn-block btn-primary">
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn gmail-btn"
                >
                  <i className="bi bi-google"></i> Login with Gmail
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
