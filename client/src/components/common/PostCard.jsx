import React, { useState, useEffect, useRef } from "react";
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
  // onEdit = () => {},
  onDelete = () => {},
  isOwner = true,
}) {
  // 로컬스토리지에서 좋아요 상태/카운트 관리
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  // 메뉴(더보기: ...) 열림 상태 및 외부 클릭 처리
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // 좋아요 상태 불러오기
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setLiked(!!likedPosts[postId]);
    // 좋아요 카운트 불러오기(없으면 props)
    const likesData = JSON.parse(localStorage.getItem("likesCount") || "{}");
    setLikesCount(likesData[postId] ?? initialLikesCount);
  }, [postId, initialLikesCount]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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

  // const handleEdit = () => {
  //   setMenuOpen(false);
  //   onEdit(postId);
  // };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(postId);
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
        {isOwner && (
          <div
            className="card-more"
            ref={menuRef}
            style={{ marginLeft: "auto", position: "relative" }}
          >
            <button
              type="button"
              className="more-btn"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="더보기 메뉴"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
                lineHeight: 1,
                cursor: "pointer",
                padding: "4px 8px",
                color:'var(--text-color-primary)'
              }}
            >
              ⋯
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="more-menu"
                style={{
                  position: "absolute",
                  top: "32px",
                  right: 0,
                  minWidth: "120px",
                  background: 'var(--bg-color-primary)',
                  border: "1px solid #e5e5e5",
                  borderRadius: "6px",
                  boxShadow: 'var(--border-color-primary)',
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                {/* <button
                  type="button"
                  role="menuitem"
                  onClick={handleEdit}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  수정
                </button> */}
                <div style={{ height: 1, background: "#eee" }} />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleDelete}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    background: 'var(--bg-color-primary)',
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-color-red)",
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
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
