import React, { useState, useEffect } from "react";
import PostCard from "../components/common/PostCard";
import "./FeedPage.css";
import { fetchPosts } from "../api/post";

function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 실제로는 API 호출로 데이터 받아오기
    fetchPosts(1, 10)
      .then((data) => {
        const items = Array.isArray(data)
          ? data
          : data.items || data.results || data.data || [];
        setPosts(items);
      })
      .catch((err) => {
        console.error(
          "게시글 목록 요청 실패:",
          err?.response?.data || err?.message || err
        );
        setPosts([]);
      });
  }, []);

  return (
    <div className="feed-page">
      {posts.length === 0 ? (
        <div className="empty-feed">포스트가 없습니다 😢</div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id ?? post.postId}
            postId={post.id ?? post.postId}
            userProfile={post.userProfile}
            username={post.username}
            location={post.location}
            postImg={post.postImg}
            content={post.content}
            createdAt={post.created_at ?? post.createdAt}
            updatedAt={post.updated_at ?? post.updatedAt}
            initialLikesCount={post.likes ?? post.initialLikesCount ?? 0}
          />
        ))
      )}
    </div>
  );
}

export default FeedPage;
