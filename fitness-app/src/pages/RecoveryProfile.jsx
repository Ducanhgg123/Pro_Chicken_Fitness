import "../style/RecoveryProfile.css"

function RecoveryProfile() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 form-column my-auto" id="Recovery">
          <h2 id="T1">Update Profile</h2>
          <div className="information" id="i1">
            <label htmlFor="avatarUpload" id="avatarIcon">
              <span aria-hidden="true" id="avatarIconIcon"><i className="bi bi-file-arrow-up"></i></span>
              <img id="avatarIconIMG" />
              <input type="file" id="avatarUpload" style={{ display: "none" }} onChange={() => {
                const preview = document.getElementById('avatarIconIMG');
                const previewI = document.getElementById('avatarIconIcon');
                const file = document.getElementById('avatarUpload').files[0];
                const reader = new FileReader();

                // listen htmlFor 'load' events on the FileReader
                reader.addEventListener("load", function () {
                  // change the preview's src to be the "result" of reading the uploaded file (below)
                  preview.src = reader.result;
                  preview.style.display = "block";
                  previewI.style.display = "none";
                }, false);

                if (file) {
                  reader.readAsDataURL(file);
                }
              }}></input>
            </label>
          </div>
          <div className="information" id="i2">
            <div className="form-group">
              <label htmlFor="Fullname" className="form-label">Fullname:</label>
              <input type="text" className="form-control" id="Fullname"></input>
            </div>

            <div className="form-group">
              <label htmlFor="WF" className="form-label">Workout Frequency:</label>
              <input type="text" className="form-control" id="WF"></input>
            </div>
          </div>

          <div className="btn-group" role="group" aria-label="Basic example">

          </div>
          <div className="btn-group" role="group">
            <button type="submit" className="btn btn-primary ">Submit</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default RecoveryProfile;