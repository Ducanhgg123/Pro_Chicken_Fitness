import "../style/SignupPage.css"

function SignupPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 image-column">
          <div className="container">
            <div className="row justify-content-center">
              <img src="AnhCorgiDeThuong.svg" id="anhCorgi" width="100%" className="img-flulid" alt="" />
            </div>
          </div>
        </div>

        <div className="col-md-6 form-column my-auto" id="Sign-up">
          <h2 id="T1">Sign-up</h2>

          <div className="first-container">
            <label class="btn btn-default btn-file" id="Avatar">
              <i class="bi bi-file-earmark-plus"></i> <input type="file" accept=".png, .jpg"required />
            </label>
            <div className="form-group" id="1">
              <label for="Email">Email address:</label>
              <input type="email" className="form-control" id="Email" placeholder="name@example.com" />
            </div>
            <div className="form-group" id="2">
              <label for="Phone">Phone number:</label>
              <input type="text" className="form-control" id="Phone" />
            </div>
          </div>

          <div className="form-group">
            <label for="User" className="form-label">User Name:</label>
            <input type="text" className="form-control" id="User"></input>
          </div>

          <div className="form-group">
            <label for="Pass" className="form-label">Password:</label>
            <input type="password" className="form-control" id="Pass"></input>
          </div>

          <div className="form-group">
            <label for="ComPass" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" id="ComPass"></input>
          </div>

          <button type="submit" className="btn btn-primary " onclick="addInputField()">Signup</button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;