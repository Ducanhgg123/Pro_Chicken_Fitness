import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const { userRoles } = useSelector((state) => state.user);
  const isCoach = userRoles.includes("ROLE_COACH");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const [currentTab, setCurrentTab] = useState(1);
  return (
    <header className="fixed-top">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light justify-content-center mt-0 mb-0">
        <Link to="/" id="navbar-brand">
          <img
            src="./image/pro-chicken-logo.jpg"
            alt="anh-ga-con-de-thuong-xiu"
            border="0"
          />
        </Link>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav nav-tabs" id="myTab" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item" role="presentation">
                <Link to={tab.path}>
                  <button
                    className={`nav-link ${
                      tab.id === currentTab ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    {tab.text}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img src="https://cdn-icons-png.flaticon.com/512/147/147140.png" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/calendar">
              Calendar
            </Dropdown.Item>
            {isCoach && (
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
