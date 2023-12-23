import { useState } from "react";
import AuthenticationService from "../api/services/AuthenticationService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUsername, setUser as setUserInfo } from "../redux/userSlice";
import UserService from "../api/services/UserService";

function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;

    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (user.confirmedPassword !== user.password) {
      setError("confirmed password does not match with password");
      return;
    }
    try {
      const res = await AuthenticationService.signup(
        user.username,
        user.password
      );
      if (res?.status == 200) {
        const loginRes = await AuthenticationService.login(
          user.username,
          user.password
        );
        if (loginRes?.status == 200) {
          const userInfoRes = await UserService.getUserbyUsername(
            user.username
          );
          if (userInfoRes?.status == 200) {
            dispatch(setUserInfo(userInfoRes.data));
          }
          sessionStorage.setItem("jwt-token", loginRes.data.jwt);
          dispatch(setUsername(user.username));
          navigate("/personal-information");
        }
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 image-column">
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

        <div className="col-md-6 my-auto">
          <h2>Sign-up</h2>

          <p className="text-danger">{error}</p>

          <div className="form-group">
            <label htmlFor="User" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password" name="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              name="confirmedPassword"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>

          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
