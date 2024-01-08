import { useQueryClient } from "react-query";
import usePostsHook from "../../../hooks/usePostsHook";
import {
  byteArrayToDataURL,
  fileToByteArray,
} from "../../../utilities/processImageArray";
import { formatVietnameseDate } from "../../../utilities/formatDate";
import { useState } from "react";

function EditPostModal({ post, setPostSelected }) {
  const { updatePostMutation } = usePostsHook();
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileToByteArray(file, function (byteArray) {
      setSelectedFile(byteArray);
      console.log(byteArray);
    });
  };

  const editPost = (e) => {
    const { name, value } = e.target;
    setPostSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await updatePostMutation.mutateAsync({
        id: post.id,
        postDate: post.postDate,
        content: post.content,
        likeCount: post.likeCount,
        thumbnail: selectedFile ? selectedFile : post.thumbnail,
      });
      console.log(res);
      setPostSelected(null);
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
              Edit Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setPostSelected(null)}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div>
                <div className="form-label">Thumbnail</div>
                {(post?.thumbnail || selectedFile) && (
                  <img
                    style={{
                      width: "50%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    src={
                      selectedFile
                        ? byteArrayToDataURL(selectedFile)
                        : byteArrayToDataURL(post?.thumbnail)
                    }
                    alt="thumbnail"
                  />
                )}
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
              </div>
              <div>
                <label htmlFor="edit-user-email" className="form-label">
                  Post Date
                </label>
                <input
                  name="postDate"
                  readOnly
                  type="text"
                  className="form-control"
                  id="edit-user-email"
                  value={formatVietnameseDate(post?.postDate)}
                  onChange={editPost}
                />
              </div>
              <div>
                <label htmlFor="edit-user-phonenumber" className="form-label">
                  Content
                </label>
                <input
                  name="content"
                  type="text"
                  className="form-control"
                  id="edit-user-phonenumber"
                  value={post?.content}
                  onChange={editPost}
                />
              </div>
              <div>
                <label htmlFor="edit-user-phonenumber" className="form-label">
                  Like Count
                </label>
                <input
                  readOnly
                  name="likeCount"
                  type="text"
                  className="form-control"
                  id="edit-user-phonenumber"
                  value={post?.likeCount}
                  onChange={editPost}
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
              onClick={() => setPostSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
