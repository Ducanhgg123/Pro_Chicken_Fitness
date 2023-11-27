import NewsFeed from "./NewsFeed";

function NewsFeeds() {
  return (
    <main
      style={{
        position: "relative",
        top: "50px",
      }}
    >
      <div className="container mt-5" id="newsfeed-blog-item">
        <NewsFeed />
      </div>
    </main>
  );
}

export default NewsFeeds;
