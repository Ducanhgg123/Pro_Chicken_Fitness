import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { Dropdown } from "react-bootstrap";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
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
            <li className="nav-item" role="presentation">
              <Link to="/">
                <button
                  className="nav-link active"
                  id="newsfeed-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#newsfeed"
                  type="button"
                  role="tab"
                  aria-controls="newsfeed"
                  aria-selected="true"
                >
                  Newsfeed
                </button>
              </Link>
            </li>
            <Link to="/coaches">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="coach-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#coach"
                  type="button"
                  role="tab"
                  aria-controls="coach"
                  aria-selected="false"
                >
                  Coach
                </button>
              </li>
            </Link>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="newsfeed"
              role="tabpanel"
              aria-labelledby="newsfeed-tab"
            ></div>
            <div
              className="tab-pane fade"
              id="coach"
              role="tabpanel"
              aria-labelledby="coach-tab"
            ></div>
          </div>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img src="https://cdn-icons-png.flaticon.com/512/147/147140.png" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
