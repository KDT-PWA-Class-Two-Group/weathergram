import React, { useState, useEffect } from "react";
import PostCard from "../components/common/PostCard";
import "./FeedPage.css";
import { fetchPosts, deletePost } from "../api/post";
import { handleEdit } from "../components/feed/HandleEdit";

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

  // 삭제 핸들러
  const handleDelete = async (postId) => {
    const ok = window.confirm("정말 이 게시글을 삭제할까요?");
    if (!ok) return;
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => (p.id ?? p.postId) !== postId));
    } catch (err) {
      console.error("삭제 실패:", err?.response?.data || err?.message || err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

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
            username={post.user?.name}
            location={post.location}
            postImg={post.postImg}
            content={post.content}
            createdAt={post.created_at ?? post.createdAt}
            updatedAt={post.updated_at ?? post.updatedAt}
            initialLikesCount={post.likes ?? post.initialLikesCount ?? 0}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
}

export default FeedPage;
