import React, { useRef, useState } from "react";
import "./Upload.css";

const Upload = () => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleCameraClick = () => cameraInputRef.current.click();
  const handleGalleryClick = () => galleryInputRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setShowModal(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setPreview(null);
        setFile(null);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title"> WeatherGram 📸</h1>
      <p className="upload-text">날씨와 함께 특별한 순간을 공유해보세요</p>


      {preview ? (
        <>
          <img src={preview} alt="preview" className="upload-preview" />
          <button className="upload-button" onClick={handleSubmit}>
            제출
          </button>
        </>
      ) : (
        <button className="upload-button" onClick={() => setShowModal(true)}>
          업로드
        </button>
      )}

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
            <p>사진이 성공적으로 업로드되었습니다!</p>
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
            <p>사진 업로드에 실패했습니다. 다시 시도해주세요.</p>
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
