import { useState } from "react";
import CommentSection from "./newsfeed/CommentSection";

function NewsFeed() {
  const [showComment, setShowComment] = useState(false);
  const toggleShowComment = () => {
    setShowComment((showComment) => !showComment);
  };
  return (
    <div className="card col-md-6 mx-auto">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <img
            src="./image/pro-chicken-logo.jpg"
            alt="Profile Picture"
            className="rounded-circle me-2"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <div>
            <h6 className="mb-0">Blogger Name</h6>
            <time className="text-muted">Posted 3 hours ago</time>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aliquid
          tenetur fugiat sunt odit cumque distinctio, doloremque illum enim eum
          quisquam eveniet assumenda, velit ullam omnis in adipisci iure id!
        </p>
        <hr />
        <div className="text-center">
          <img
            src="./image/pro-chicken-logo.jpg"
            alt="Blog Image"
            style={{
              height: "200px",
            }}
          />
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary">
            <i className="bi bi-hand-thumbs-up-fill"></i>
          </button>
          {/* Comment button */}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowComment}
          >
            <i className="bi bi-chat-left-dots-fill"></i>
          </button>
        </div>
        <div className="d-flex gap-2">
          <div className="text-muted me-2">10 Likes</div>
          <div className="text-muted">5 Comments</div>
        </div>
      </div>
      {showComment && <CommentSection />}
    </div>
  );
}

export default NewsFeed;
