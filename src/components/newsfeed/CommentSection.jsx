import { useSelector } from "react-redux";
import CommentService from "../../api/services/CommentService";
import { useState } from "react";
import { Button } from "react-bootstrap";

function CommentSection({ post }) {
  const { username } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const postComment = async () => {
    try {
      const res = await CommentService.createComment(
        username,
        post.id,
        content
      );
      console.log(res);
      if (res?.status == 200) {
        setContent("");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-2">
      <h5>Comments</h5>
      <form>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Type your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <Button type="button" onClick={postComment} className="btn btn-primary">
          Comment
        </Button>
      </form>
      {/* List of comments */}
      <div className="mt-4">
        <div className="mt-3 d-flex gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147140.png"
            className="mr-3 rounded-circle"
            alt="User 1"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="">
            <h5 className="mt-0">John</h5>
            <p>
              User Comment: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
        </div>
        <div className="mt-3 d-flex gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147140.png"
            className="mr-3 rounded-circle"
            alt="User 1"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="">
            <h5 className="mt-0">John</h5>
            <p>
              User Comment: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
        </div>
        <div className="mt-3 d-flex gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147140.png"
            className="mr-3 rounded-circle"
            alt="User 1"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="">
            <h5 className="mt-0">John</h5>
            <p>
              User 1's Comment: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
