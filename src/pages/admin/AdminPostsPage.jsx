import { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import usePostsHook from "../../hooks/usePostsHook";
import { formatVietnameseDate } from "../../utilities/formatDate";
import EditPostModal from "../../components/admin/posts/EditPostModal";
import { byteArrayToDataURL } from "../../utilities/processImageArray";

function AdminPostsPage() {
  const { posts, deletePostMutation } = usePostsHook();
  const [selectedPost, setSelectedPost] = useState(null);
  const deletePost = (post) => {
    if (confirm("Are you sure ?") == true) {
      deletePostMutation.mutate(post.id);
      console.log("Tiến hành xóa nha!!!");
    } else {
      console.log("Thui không xóa nữa đâu");
    }
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <NavbarAdmin />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">POST LIST</h1>
          </div>

          <div className="card border-left-primary shadow h-100 py-2">
            <div className="row no-gutters align-items-center">
              <table
                className="table table-hover"
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>PostID</th>
                    <th>Thumbnail</th>
                    <th>Post date</th>
                    <th>Like</th>
                    <th>Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((post) => (
                    <tr key={post?.id}>
                      <td>{post?.id}</td>
                      <td>
                        <img
                          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1Z9z7Do3kfOJxR3JsE_ua8HnUz00J-yelw&usqp=CAU"
                          src={byteArrayToDataURL(post?.thumbnail)}
                          style={{
                            maxWidth: "75px",
                            maxHeight: "75px",
                          }}
                          alt="Post thumbnail"
                        />
                      </td>
                      <td>{formatVietnameseDate(post?.postDate)}</td>
                      <td>{post?.likeCount}</td>
                      <td>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"
                          onClick={() => setSelectedPost(post)}
                        >
                          <i className="bi bi-gear-fill"></i>
                          Edit
                        </button>
                        <button
                          className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                          onClick={() => deletePost(post)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedPost && (
                <EditPostModal
                  post={selectedPost}
                  setPostSelected={setSelectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPostsPage;
