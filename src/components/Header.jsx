import React from "react";

function Header() {
  return (
    <header className="fixed-top">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light justify-content-center mt-0 mb-0">
        <a href="#" id="navbar-brand">
          <img
            src="./image/pro-chicken-logo.jpg"
            alt="anh-ga-con-de-thuong-xiu"
            border="0"
          />
        </a>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
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
            </li>
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
        <div className="dropdown ml-auto">
          <button
            className="btn btn-secondary"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147140.png"
              alt="Avatar"
              border="0"
            />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
