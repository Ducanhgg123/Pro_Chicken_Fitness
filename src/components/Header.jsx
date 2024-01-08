import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setUpNotificationRequestCoach } from "../firebase/notification/request-coach";
import { useCountNotifications } from "../hooks/useNotificationsHook";

const tabs = [
  {
    id: 1,
    text: "Newsfeed",
    path: "/",
  },
  {
    id: 2,
    text: "Coaches",
    path: "/coaches",
  },
];
function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, userRoles } = useSelector((state) => state.user);
  const countNotifications = useCountNotifications();
  const isCoach = userRoles.includes("ROLE_COACH");

  useEffect(() => {
    setUpNotificationRequestCoach();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed-top">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light justify-content-center mt-0 mb-0">
        <Link to="/" id="navbar-brand">
          <img src="./Logo.png" alt="anh-ga-con-de-thuong-xiu" border="0" />
        </Link>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex gap-4" id="myTab" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item" role="presentation">
                <Link to={tab.path}>
                  <button
                    className={`btn-tab ${
                      tab.path === pathname ? "active" : ""
                    }`}
                    type="button"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "20px",
                      border: "1px solid #fff",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tab.text}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <img src="./Logo.png" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/calendar">
              Calendar
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/fitness-chat">
              Chat
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/notification">
              <li className="nav-item mr-3 d-flex gap-2">
                <div>Notification</div>
                <div>
                  <i className="fas fa-bell danger"></i>
                  <span className="badge badge-danger">
                    {countNotifications}
                  </span>
                </div>
              </li>
            </Dropdown.Item>
            {!isCoach && (
              <Dropdown.Item as={Link} to="/become-coach">
                Become coach
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
