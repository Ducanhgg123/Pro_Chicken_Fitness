import { useState } from "react";
import AuthenticationService from "../../api/services/AuthenticationService";
import { useMutation, useQueryClient } from "react-query";

function AddUserModal({ setIsAddUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const mutation = useMutation(
    ({ username, password }) => {
      return AuthenticationService.signup(username, password);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const handleAddUser = () => {
    // Validate fields or perform any additional checks here
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password");
      return;
    }
    console.log(username, password);
    // Call the addUser function with the new user data
    mutation.mutate({ username, password });
    // Clear input fields after adding user
    setUsername("");
    setPassword("");
    setIsAddUser(false);
  };

  return (
    <div
      className="modal"
      id="addUserModal"
      style={{
        display: "block",
      }}
      role="dialog"
      aria-labelledby="addUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">
              Add User
            </h5>
            <button
              type="button"
              className="close"
              onClick={() => setIsAddUser(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAddUser(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
