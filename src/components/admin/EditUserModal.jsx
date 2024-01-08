import { useMutation, useQueryClient } from "react-query";
import UserService from "../../api/services/UserService";

function EditUserModal({ user, setSelectedUser }) {
  const queryClient = useQueryClient();
  const editUser = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const mutation = useMutation(UserService.updateUserInfo);
  const handleSubmit = async () => {
    try {
      const response = await mutation.mutateAsync(user);
      console.log(response);
      setSelectedUser(null);
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal"
      style={{
        display: "block",
      }}
      id="editUserModalAdmin"
      aria-labelledby="editUserModalAdminLabel"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalAdminLabel">
              Edit User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setSelectedUser(null)}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div>
                <label htmlFor="edit-user-fullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  id="edit-user-fullname"
                  value={user?.fullname}
                  onChange={editUser}
                />
              </div>
              <div>
                <label htmlFor="edit-user-email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  id="edit-user-email"
                  value={user?.email}
                  onChange={editUser}
                />
              </div>
              <div>
                <label htmlFor="edit-user-phonenumber" className="form-label">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                  id="edit-user-phonenumber"
                  value={user?.phoneNumber}
                  onChange={editUser}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
