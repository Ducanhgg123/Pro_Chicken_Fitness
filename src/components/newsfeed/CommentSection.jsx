import { useSelector } from "react-redux";
import CommentService from "../../api/services/CommentService";
import { useState } from "react";
import { Button } from "react-bootstrap";

function CommentSection({ post, comments, setComments }) {
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
        setComments([
          ...comments,
          {
            id: res.data.id,
            content,
            username,
            avatar: null,
          },
        ]);
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
        <div className="form-group mb-3">
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
      <div className="mt-3" style={{ overflowY: "auto", maxHeight: "300px" }}>
        {comments?.map((comment) => (
          <div key={comment?.id} className="mt-3 d-flex gap-3">
            <img
              src={
                comment?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/147/147140.png"
              }
              className="mr-3 rounded-circle"
              alt="User 1"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="">
              <h5 className="mt-0">{comment?.username || "username"}</h5>
              <p>{comment?.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
