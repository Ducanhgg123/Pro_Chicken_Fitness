import NavbarAdmin from "../../components/admin/NavbarAdmin";

function AdminWorkoutActivitiesPage() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">WORKOUT ACTIVITY LIST</h1>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#addWorkoutActivityModalAdmin"
            >
              <i className="bi bi-plus-circle-fill"></i>
              Add
            </a>
          </div>

          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table
                className="table table-hover"
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <th>WAID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Setting</th>
                </tr>
                <tr>
                  <td>0001</td>
                  <td>Deadlifts</td>
                  <td>
                    <img
                      src="https://blogscdn.thehut.net/wp-content/uploads/sites/495/2018/10/25171220/Blog-Deadlifting-Male_1800x672_1200x672_acf_cropped.jpg"
                      style={{
                        maxWidth: "75px",
                        maxHeight: "75px",
                      }}
                      alt="WA image"
                    />
                  </td>
                  <td>
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editWorkoutActivityModalAdmin"
                    >
                      <i className="bi bi-gear-fill"></i>
                      Edit
                    </a>
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                    >
                      <i className="bi bi-trash3-fill"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>0002</td>
                  <td>Circuit Training</td>
                  <td>
                    <img
                      src="https://cdn-s3.thevarsity.ca/2017/11/Sports_Circuit-Training-Benefits_Jing-Tey.jpg"
                      style={{
                        maxWidth: "75px",
                        maxHeight: "75px",
                      }}
                      alt="WA image"
                    />
                  </td>
                  <td>
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editWorkoutActivityModalAdmin"
                    >
                      <i className="bi bi-gear-fill"></i>
                      Edit
                    </a>
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                    >
                      <i className="bi bi-trash3-fill"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWorkoutActivitiesPage;
