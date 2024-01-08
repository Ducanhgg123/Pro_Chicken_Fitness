import NavbarAdmin from "../../components/admin/NavbarAdmin";
import "../../styles/Admin.css";
function AdminPage() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">HOME</h1>
          </div>
        </div>

        <div className="row justify-content-between no-gutters ml-3 mr-3 mb-4">
          <div className="col mr-2">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      1234
                    </div>
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      <i className="bi bi-people-fill"></i>
                      Users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col mr-2">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      123
                    </div>
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      <i className="bi bi-postcard-heart-fill"></i>
                      Posts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col mr-2">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      134
                    </div>
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      <i className="bi bi-bag-heart-fill"></i>
                      Ingredients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col mr-2">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      124
                    </div>
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      <i className="bi bi-card-checklist"></i>
                      Dishes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      14
                    </div>
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      <i className="bi bi-activity"></i>
                      Workout activities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col col-auto">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">About us</h6>
            </div>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col-4">
                  <div className="row justify-content-center">
                    <img
                      src="./Logo.png"
                      style={{
                        maxWidth: "250px",
                      }}
                      alt="ProChicken logo"
                    />
                  </div>
                  <div className="row justify-content-center">
                    <div className="font-weight-bold text-primary text-uppercase mb-1">
                      ProChicken - ProChicken Fitness
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="row no-gutters align-items-center">
                    <table
                      className="table table-hover"
                      style={{
                        width: "100%",
                      }}
                    >
                      <tr>
                        <th>Student ID</th>
                        <th>Fullname</th>
                        <th>Role</th>
                      </tr>
                      <tr>
                        <td>21127005</td>
                        <td>Le Trong Duc Anh</td>
                        <td>Backend, Project Manager</td>
                      </tr>
                      <tr>
                        <td>21127241</td>
                        <td>Nguyen Thanh Dat</td>
                        <td>Designer, Frontend</td>
                      </tr>
                      <tr>
                        <td>21127246</td>
                        <td>Le Minh Duc</td>
                        <td>Frontend</td>
                      </tr>
                      <tr>
                        <td>21127574</td>
                        <td>Phan Truong Quy Hoa</td>
                        <td>Frontend, Business Analyst</td>
                      </tr>
                      <tr>
                        <td>21127640</td>
                        <td>Huynh Huu Loc</td>
                        <td>Designer</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
