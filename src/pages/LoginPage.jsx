import { useState } from "react";
// import "./LoginPage.css";
import AuthenticationService from "../api/services/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUsername,
  setUser as setUserInfo,
  setUserRoles,
} from "../redux/userSlice";
import UserService from "../api/services/UserService";
import Button from "../components/button/Button";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = (name, e) => {
    setUser({ ...user, [name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log("submit");
    try {
      const res = await AuthenticationService.login(
        user.username,
        user.password
      );
      if (res?.status == 200) {
        sessionStorage.setItem("jwt-token", res.data.jwt);
        const userInfoRes = await UserService.getUserbyUsername(user.username);
        const userRolesRes = await UserService.getUserRoles(user.username);
        if (userInfoRes?.status == 200 && userRolesRes?.status == 200) {
          dispatch(setUserInfo(userInfoRes.data));
          let userRoles = [];
          for (const userRole of userRolesRes.data) {
            userRoles.push(userRole.name);
          }
          dispatch(setUserRoles(userRoles));
        }
        dispatch(setUsername(user.username));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-6">
          <div className="container">
            <div className="row justify-content-center">
              <img
                src="./Logo.png"
                id="anhCorgi"
                width="100%"
                className="img-flulid"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 my-auto">
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
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e)}
                />
              </div>

              <div className="">
                <Button width={100} onClick={handleSubmit}>
                  Login
                </Button>
                <div className="d-flex justify-content-center mt-3">
                  <p className="text-gray mr-2">Dont have an account?</p>
                  <Link to="/signup" className="text-primary">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
