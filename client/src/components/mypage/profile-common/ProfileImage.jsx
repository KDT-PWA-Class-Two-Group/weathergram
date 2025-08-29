import React from "react";

export function ProfileImage ({userProfileImage}){

  return(
    <div className="w-100px h-100px radius-50 marginLeft-10px"
        style={{ backgroundColor: "skyblue" }}>
            {/* 프로필 이미지 (이미지가 없을시 배경색만 보임) */}
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="사용자 지정 프로필 사진"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              /> //이미지 로드 실패시 배경색(하늘색)이 보임
            ) : null}
          </div>
  )
}