function CommentSection() {
  return (
    <div className="p-2">
      <h5>Comments</h5>
      <form>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Type your comment here..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Comment
        </button>
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
              User 1's Comment: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
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

      {/* Add more comments in a similar structure */}
    </div>
  );
}

export default CommentSection;
