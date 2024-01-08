import { Link } from "react-router-dom";

function SidebarBarAdmin() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/admin"
      >
        <img
          src="/Logo.png"
          style={{
            maxWidth: "75px",
            maxHeight: "75px",
          }}
          alt="ProChicken logo"
        />
        <div className="sidebar-brand-text mx-3">ProChicken Admin</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/admin">
          <i className="bi bi-house-fill"></i>
          <span>Home</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/admin/users">
          <i className="bi bi-people-fill"></i>
          <span>Users</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/admin/posts">
          <i className="bi bi-postcard-heart-fill"></i>
          <span>Posts</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/admin/ingredients">
          <i className="bi bi-bag-heart-fill"></i>
          <span>Ingredients</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/admin/dishes">
          <i className="bi bi-card-checklist"></i>
          <span>Dishes</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/admin/workout-activities">
          <i className="bi bi-activity"></i>
          <span>Workout activies</span>
        </Link>
      </li>
    </ul>
  );
}

export default SidebarBarAdmin;
