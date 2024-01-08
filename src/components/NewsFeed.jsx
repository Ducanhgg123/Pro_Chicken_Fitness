import { useState } from "react";
import CommentSection from "./newsfeed/CommentSection";
import PostService from "../api/services/PostService";
import { formattedDate } from "../utilities/formatDate";
import { byteArrayToDataURL } from "../utilities/processImageArray";

const buttonStyles = {
  transition: "background-color 0.3s ease",
  backgroundColor: "initial",
  borderRadius: "5px",
};

const hoverStyles = {
  backgroundColor: "#3fer", // Change to your desired hover color
};

function NewsFeed({ post }) {
  const [showComment, setShowComment] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);

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
          {post?.thumbnail && (
            <img
              src={byteArrayToDataURL(post.thumbnail)}
              alt="Blog Image"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{
              transition: "all 0.3s ease",
            }}
            onClick={handleLikePost}
          >
            <i className="bi bi-hand-thumbs-up-fill"></i>
          </button>
          {/* Comment button */}
          <button
            type="button"
            className="btn"
            style={{
              ...buttonStyles,
              ...(isHovered && hoverStyles), // Apply hover styles conditionally
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleShowComment}
          >
            <i className="bi bi-chat-left-dots-fill"></i>
          </button>
        </div>
        <div className="d-flex gap-2">
          <div className="text-muted me-2">{likeCount} Likes</div>
          <div className="text-muted">{post?.commentCount || 0} Comments</div>
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
