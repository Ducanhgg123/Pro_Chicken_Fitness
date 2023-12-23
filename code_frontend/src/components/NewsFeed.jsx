import { useState } from "react";
import CommentSection from "./newsfeed/CommentSection";
import moment from "moment/moment";
import PostService from "../api/services/PostService";

function NewsFeed({ post }) {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [thumbnail, setThumbnail] = useState(null);

  const toggleShowComment = async () => {
    setShowComment((showComment) => !showComment);
    if (!showComment && comments.length == 0)
      try {
        const res = await PostService.getCommentsByPost(post.id);
        console.log("comments", res);

        if (res?.status == 200) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
  };

  const formattedDate = (dateString) => {
    // Parse the given date string using Moment.js
    const date = moment(dateString || moment.now());

    // Calculate the difference between the date and the current time
    const timeAgo = date.fromNow();

    return `Posted ${timeAgo}`;
  };

  const handleLikePost = async () => {
    setLikeCount((likeCount) => likeCount + 1);
    try {
      const res = await PostService.likePost(post.id);
      console.log(res);
      if (res?.status) {
        setLikeCount(res.data?.likeCount);
      } else {
        alert("cannot like post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderThumbnail = () => {
    if (post?.thumbnail) {
      const uint8Array = new Uint8Array(post.thumbnail);

      // Convert Uint8Array to Blob
      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      // Read Blob as Data URL
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(blob);
      return thumbnail;
    }
    return "./image/pro-chicken-logo.jpg";
  };

  return (
    <div className="card col-md-6 mx-auto my-3">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <img
            src={"./image/pro-chicken-logo.jpg"}
            alt="Profile Picture"
            className="rounded-circle me-2"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <div>
            <h6 className="mb-0">Blogger name</h6>
            <time className="text-muted">{formattedDate(post?.postDate)}</time>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{post?.content || "Empty content"}</p>
        <hr />
        <div className="text-center">
          <img
            src={renderThumbnail()}
            alt="Blog Image"
            style={{
              height: "200px",
            }}
          />
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleLikePost}
          >
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
          <div className="text-muted me-2">{likeCount} Likes</div>
          <div className="text-muted">5 Comments</div>
        </div>
      </div>
      {showComment && (
        <CommentSection
          post={post}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
}

export default NewsFeed;
