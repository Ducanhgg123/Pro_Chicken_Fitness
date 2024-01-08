import { Outlet } from "react-router-dom";
import SidebarBarAdmin from "../admin/SidebarBarAdmin";
import "../../styles/Admin.css";

function AdminLayout() {
  return (
    <div>
      <div id="wrapper">
        <SidebarBarAdmin />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
