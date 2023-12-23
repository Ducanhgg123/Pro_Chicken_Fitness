import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import PostService from "../../api/services/PostService";

function WhatOnYourMind({ posts, setPosts }) {
  const { username } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (!username) {
      console.log("dont have user");
      return;
    }
    formData.append("username", username);
    formData.append("thumbnail", selectedFile);
    formData.append("content", content);

    try {
      const res = await PostService.createPost(formData);
      console.log(res);
      handleClose();
      if (res?.status == 200) {
        setPosts([
          ...posts,
          {
            id: res.data.id,
            title: res.data.title,
            content: res.data.content,
            postDate: res.data.postDate,
            likeCount: res.data.likeCount,
            thumbnail: res.data.thumbnail,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  What's on your mind, {username || ""}?
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
                    <h6 className="mb-0">Blogger {username}</h6>
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                        onChange={handleFileChange}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-primary"
                    >
                      Post
                    </button>
                  </div>
                </form>
                {selectedFile && (
                  <div className="mt-3">
                    <h6>Your image:</h6>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      style={{ width: "100%", maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WhatOnYourMind;
