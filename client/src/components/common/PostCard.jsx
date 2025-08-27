import React, { useState, useEffect } from "react";
import "./PostCard.css";

// postId prop이 필요합니다 (각 포스트 고유값)
function PostCard({
  postId,
  userProfile,
  username = "그린컴퓨터아카데미",
  location = "둔산동",
  postImg,
  content = "",
  createdAt,
  updatedAt,
  initialLikesCount = 0,
}) {
  // 로컬스토리지에서 좋아요 상태/카운트 관리
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  useEffect(() => {
    // 좋아요 상태 불러오기
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setLiked(!!likedPosts[postId]);
    // 좋아요 카운트 불러오기(없으면 props)
    const likesData = JSON.parse(localStorage.getItem("likesCount") || "{}");
    setLikesCount(likesData[postId] ?? initialLikesCount);
  }, [postId, initialLikesCount]);

  const handleLike = () => {
    // 좋아요 상태 토글
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    const likesData = JSON.parse(localStorage.getItem("likesCount") || "{}");
    let newLiked = !liked;
    let newCount = likesCount;
    if (newLiked) {
      likedPosts[postId] = true;
      newCount = likesCount + 1;
    } else {
      delete likedPosts[postId];
      newCount = Math.max(0, likesCount - 1);
    }
    likesData[postId] = newCount;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    localStorage.setItem("likesCount", JSON.stringify(likesData));
    setLiked(newLiked);
    setLikesCount(newCount);
  };

  return (
    <div className="post-card">
      <div className="card-header">
        <div className="card-profile">
          {userProfile ? (
            <img src={userProfile} alt="유저 프로필 사진" />
          ) : (
            <div className="avatar avatar--placeholder" />
          )}
        </div>
        <div className="card-user-info">
          <span className="font">{username}</span>
          <span className="card-location">{location}</span>
        </div>
      </div>
      <div className="card-img-area">
        {postImg ? (
          <img className="card-img" src={postImg} alt="업로드 사진" />
        ) : (
          <div className="card-img card-img--placeholder">사진 준비중</div>
        )}
      </div>
      <div className="card-actions">
        <span
          className={"card-icon" + (liked ? " liked" : "")}
          style={{ color: liked ? "#e1306c" : "#aaa", cursor: "pointer" }}
          onClick={handleLike}
          role="button"
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          {liked ? "❤️" : "🤍"}
        </span>
        <div className="card-likes">{likesCount}</div>
      </div>
      <div className="card-caption">{content}</div>
      <div className="card-meta">
        {createdAt && (
          <span className="created-at">
            작성: {new Date(createdAt).toLocaleString()}
          </span>
        )}
        {updatedAt && updatedAt !== createdAt && (
          <span className="updated-at">
            {" "}
            · 수정: {new Date(updatedAt).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default PostCard;
