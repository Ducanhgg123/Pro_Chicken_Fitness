import { useEffect, useState } from "react";
import NewsFeed from "./NewsFeed";
import WhatOnYourMind from "./newsfeed/WhatOnYourMind";
import PostService from "../api/services/PostService";

function NewsFeeds() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await PostService.getAllPosts();
        console.log(res);
        if (res?.status == 200) {
          setPosts(res.data);
        } else {
          alert("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <main
      style={{
        position: "relative",
        top: "50px",
      }}
    >
      <div className="container mt-5" id="newsfeed-blog-item">
        <WhatOnYourMind />
        {posts?.map((post) => (
          <NewsFeed key={post?.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default NewsFeeds;
