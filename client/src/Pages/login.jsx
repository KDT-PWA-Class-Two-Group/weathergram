import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSave } from "../api/user";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showDirect, setShowDirect] = useState(false);
  const navigate = useNavigate();

  const handleSocialLogin = (platform) => {
    alert(`${platform} 로그인 기능은 현재 구현 중입니다.`);
    // 실제 소셜 로그인 로직은 여기에 구현
  };

  const showDirectLogin = () => setShowDirect(true);
  const showSocialLogin = () => setShowDirect(false);

  const handleLogin = async () => {
    try {
      await handleSave({ userId: id, password: pw });
      navigate("/main");
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="/images/wg-logo.svg"
          alt="Weathergram Logo"
          className="login-logo"
        />
        <h2 className="login-title">Weathergram</h2>
        <p className="login-subtitle">날씨와 함께 순간을 공유하세요</p>

        {showDirect ? (
          <>
            <h3 className="login-section-title">계정으로 로그인</h3>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="login-input"
            />
            <button className="login-button" onClick={handleLogin}>
              로그인
            </button>
            <button
              type="button"
              className="link-button back-to-social"
              onClick={showSocialLogin}
            >
              ← 소셜 로그인으로 돌아가기
            </button>
          </>
        ) : (
          <>
            <button
              className="social-button google"
              onClick={() => handleSocialLogin("Google")}
            >
              Google로 로그인
            </button>
            <button
              className="social-button kakao"
              onClick={() => handleSocialLogin("Kakao")}
            >
              Kakao로 로그인
            </button>
            <button
              className="social-button naver"
              onClick={() => handleSocialLogin("Naver")}
            >
              Naver로 로그인
            </button>

            <p className="login-info">
              소셜 로그인을 통해 간편하게 가입하고
              <br />
              날씨와 함께하는 특별한 순간들을 공유해보세요
            </p>

            <div className="divider">또는</div>
            <button
              type="button"
              className="login-button outline"
              onClick={showDirectLogin}
            >
              직접 로그인
            </button>
          </>
        )}
      </div>
    </div>
  );
}
