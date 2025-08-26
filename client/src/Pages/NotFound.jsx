import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>페이지를 찾을 수 없어요 🥲</p>
      <button style={styles.button} onClick={goHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: "8rem",
    color: "#ff6b6b",
    margin: 0,
  },
  message: {
    fontSize: "1.5rem",
    margin: "10px 0 30px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#4ecdc4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default NotFoundPage;
