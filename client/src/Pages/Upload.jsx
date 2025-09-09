import React, { useState } from "react";
import "./Upload.css";
import { fetchPost } from "../api/post";

const API_BASE = import.meta.env.BACKEND_URL;

const Upload = () => {
  const [showModal, setShowModal] = useState(false);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [mode, setMode] = useState("idle"); // 'idle' | 'photo' | 'text'
  const [contentText, setContentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cameraInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);

  const handleCameraClick = () => {
    setMode("photo");
    cameraInputRef.current.click();
  };
  const handleGalleryClick = () => {
    setMode("photo");
    galleryInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setShowModal(false);
    }
  };

  const handleSubmit = async () => {
    if (mode === "photo" && !file) return;
    if (mode === "text" && !contentText.trim()) return;

    // if (mode === "photo" && file) {
    //   formData.append("image", file); // 서버 컨트롤러에서 FileInterceptor('image') 사용
    // }
    //   if (mode === "text") {
    //   const body = { content: contentText.trim() };
    // }
    // 필요시 작성자 ID가 있다면 추가: formData.append('authorId', userId)

    try {
      setIsSubmitting(true);
      const body = { content: contentText.trim() };
      const data = await fetchPost(body);
      if (data) {
        setShowSuccessModal(true);
        setPreview(null);
        setFile(null);
        setContentText("");
        setMode("idle");
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title"> WeatherGram 📸</h1>
      <p className="upload-text">날씨와 함께 특별한 순간을 공유해보세요</p>

      {/* 업로드 이미지 구간 */}
      {preview ? (
        <>
          <img src={preview} alt="preview" className="upload-preview" />
          <button
            className="upload-button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "전송 중..." : "사진 올리기"}
          </button>
        </>
      ) : (
        <>
          {mode === "text" ? (
            <div className="text-mode">
              <textarea
                className="text-input"
                placeholder="무슨 생각을 기록할까요?"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                rows={6}
              />
              <div className="text-actions">
                <button
                  className="upload-button"
                  disabled={isSubmitting || !contentText.trim()}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "전송 중..." : "글 올리기"}
                </button>
                <button
                  className="modal-button cancel-button"
                  onClick={() => {
                    setMode("idle");
                    setContentText("");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className="choice-actions">
              <button
                className="upload-button"
                onClick={() => setShowModal(true)}
              >
                사진 업로드
              </button>
              <button className="upload-button" onClick={() => setMode("text")}>
                글 작성
              </button>
            </div>
          )}
        </>
      )}

      {/* 업로드 텍스트 구간 */}
      {/* <div className="text-mode">
        <textarea
          className="text-input"
          placeholder="무슨 생각을 기록할까요?"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          rows={6}
        />
        <div className="text-actions">
          <button
            className="upload-button"
            disabled={isSubmitting || !contentText.trim()}
            onClick={handleSubmit}
          >
            {isSubmitting ? "전송 중..." : "글 올리기"}
          </button>
          <button
            className="modal-button cancel-button"
            onClick={() => {
              setMode("idle");
              setContentText("");
            }}
          >
            취소
          </button>
        </div>
      </div> */}

      {/* 업로드 선택 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>사진 선택</h2>
            <button className="modal-button" onClick={handleCameraClick}>
              📷 카메라
            </button>
            <button className="modal-button" onClick={handleGalleryClick}>
              🖼 갤러리
            </button>
            <button
              className="modal-button cancel-button"
              onClick={() => setShowModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 업로드 성공 모달 */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>업로드 완료</h2>
            <p>게시글이 업로드되었습니다!</p>
            <button
              className="modal-button"
              onClick={() => setShowSuccessModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 업로드 실패 모달 */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>업로드 실패</h2>
            <p>게시글 업로드에 실패했습니다. 다시 시도해주세요.</p>
            <button
              className="modal-button cancel-button"
              onClick={() => setShowErrorModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
