import React from "react";
import '../../Pages/myPage.css'

export function MyPageHeader({userHederImage}) {

  return(
    <div className="w-100 h-240px" style={{ backgroundColor: "#ddd" }}>
          {userHederImage ? (
            <img
              src={userHederImage}
              alt="사용자 지정 프로필 사진"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
              }}
            /> //이미지 로드 실패시 배경색(회색)이 보임
          ) : null}
        </div>
  )
  
}