import NewsFeed from "./NewsFeed";
import WhatOnYourMind from "./newsfeed/WhatOnYourMind";

function NewsFeeds() {
  return (
    <main
      style={{
        position: "relative",
        top: "50px",
      }}
    >
      <div className="container mt-5" id="newsfeed-blog-item">
        <WhatOnYourMind />
        <NewsFeed />
      </div>
    </main>
  );
}

export default NewsFeeds;
