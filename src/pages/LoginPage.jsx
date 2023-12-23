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
              {/* <input
                type="file"
                accept="image/*" // Limit accepted file types to images
                onChange={handleFileChange}
              /> */}
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

              <div className="">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  Login
                </button>

                <div className="d-flex justify-content-between mt-3">
                  <p className="text-gray">Dont have an account</p>
                  <Link to="/signup">
                    <p className="">Sign up</p>
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
