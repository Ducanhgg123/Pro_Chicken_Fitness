import { useState } from "react";
import EditUserModal from "../../components/admin/EditUserModal";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import useUsersHook from "../../hooks/useUsersHook";
import { calculateAge } from "../../utilities/convertAge";
import AddUserModal from "../../components/admin/AddUserModal";

function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { users } = useUsersHook();
  const [isAddUser, setIsAddUser] = useState(false);

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">USER LIST</h1>
            <button
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
              onClick={() => setIsAddUser(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Add
            </button>
          </div>
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table className="table table-hover" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user?.username}</td>
                      <td>{user?.fullname}</td>
                      <td>{calculateAge(user?.dateOfBirth)}</td>
                      <td>
                        {user?.roles?.length > 0 &&
                          user?.roles[user.roles.length - 1].name}
                      </td>
                      <td>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                          onClick={() => handleSelectedUser(user)}
                        >
                          <i className="bi bi-gear-fill"></i>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedUser && (
            <EditUserModal
              user={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {isAddUser && <AddUserModal setIsAddUser={setIsAddUser} />}
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
