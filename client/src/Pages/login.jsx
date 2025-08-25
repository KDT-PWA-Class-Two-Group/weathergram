import React, { useState } from "react";
import { handleSave } from "../api/user";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div>
      <div
        style={{
          width: "400px",
          height: "470px",
          border: "1px solid #505050",
          borderRadius: "12px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 24px",
          boxSizing: "border-box",
          background: "#fff",
        }}
      >
        {/* 앱 로고 */}
        <img
          src="/logo192.png"
          alt="Weathergram Logo"
          style={{ width: 64, height: 64, marginBottom: 16 }}
        />
        {/* 앱 이름 */}
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 28, color: "#222" }}>
          Weathergram
        </h2>
        {/* 설명 */}
        <p style={{ margin: "12px 0 32px 0", color: "#555", fontSize: 16 }}>
          날씨와 함께 순간을 공유하세요
        </p>
        {/* 회원가입 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "24px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={() => handleSave({ id, pw })}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
