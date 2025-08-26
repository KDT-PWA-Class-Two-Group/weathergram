import React, { useState, useEffect } from "react";
import PostCard from "../components/common/PostCard";
import "./FeedPage.css";

// 예시 데이터 
const mockPosts = [
  {
    postId: "1",
    userProfile: "/images/profiles/user1.jpg",
    username: "해진",
    location: "둔산동",
    postImg: "/images/posts/post1.jpg",
    initialLikesCount: 12,
  },
  {
    postId: "2",
    userProfile: "/images/profiles/user2.jpg",
    username: "지민",
    location: "탄방동",
    postImg: "/images/posts/post2.jpg",
    initialLikesCount: 8,
  },
  {
    postId: "3",
    userProfile: "/images/profiles/user3.jpg",
    username: "수빈",
    location: "월평동",
    postImg: "/images/posts/post3.jpg",
    initialLikesCount: 25,
  },
];

function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 실제로는 API 호출로 데이터 받아오기
    setPosts(mockPosts);
  }, []);

  return (
    <div className="feed-page">
      {posts.length === 0 ? (
        <div className="empty-feed">포스트가 없습니다 😢</div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.postId}
            postId={post.postId}
            userProfile={post.userProfile}
            username={post.username}
            location={post.location}
            postImg={post.postImg}
            initialLikesCount={post.initialLikesCount}
          />
        ))
      )}
    </div>
  );
}

export default FeedPage;
