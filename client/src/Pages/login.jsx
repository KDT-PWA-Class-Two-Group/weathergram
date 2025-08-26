import React from "react";
import "./Login.css";

function Login() {
  const handleSocialLogin = (platform) => {
    alert(`${platform} 로그인 기능은 현재 구현 중입니다.`);
    // 실제 소셜 로그인 로직은 여기에 구현
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
          소셜 로그인을 통해 간편하게 가입하고<br />
          날씨와 함께하는 특별한 순간들을 공유해보세요
        </p>
      </div>
    </div>
  );
}

export default Login;