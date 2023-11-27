import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="my-5" id="self-posting-box">
        <div className="card col-md-6 mx-auto">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto me-0 ms-0 text-center pr">
                <img
                  src="./image/pro-chicken-logo.jpg"
                  alt="Profile Picture"
                  className="rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary w-100 text-start opacity-75 btn-secondary"
                  onClick={handleShow}
                >
                  What's on your mind?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <img
                    src="./image/pro-chicken-logo.jpg"
                    alt="Profile Picture"
                    className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <div>
                    <h6 className="mb-0">Blogger name</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      style={{ height: "120px" }}
                      placeholder="What's on your mind?"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <label
                        htmlFor="imageInput"
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-image"></i> Add Image
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        className="visually-hidden"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
