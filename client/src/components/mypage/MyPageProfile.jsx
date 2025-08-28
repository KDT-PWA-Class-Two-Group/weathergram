// MyPageProfile > ProfileImage, ProfileName, ProfileSet 3가지로 분리
import React from "react";


export function MyPageProfile(){

  return(
    <div className="w-100 h-100px display-flex-alignItems-center marginTop--40px">
      {/* 프로필 이미지 */}
          <div
            className="w-100px h-100px radius-50 marginLeft-10px"
            style={{ backgroundColor: "skyblue" }}
          >
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
        {/* 프로필 이름 */}
          <div className="w-240px h-70px marginLeft-20px marginTop-30px">
            <p className="font-size-16 font-weight-b">{userCustomName}</p>
            <p className="font-size-14 marginTop--10px display-flex-alignItems-center">
              <img
                src="./public/images/icons/image-list.svg"
                alt=""
                srcset=""
                className="profile-icon"
              />{" "}
              <span className="marginLeft-5px">0</span>
              <img
                src="./public/images/icons/heart.svg"
                alt=""
                srcset=""
                className="marginLeft-10px profile-icon"
              />{" "}
              <span className="marginLeft-5px">0</span>
            </p>
          </div>
        {/* 프로필 셋팅 */}
          <div
            className="h-100px display-flex-center-end marginLeft-10px"
            onClick={handleProfileSetClick}
          >
            <img
              className="profile-set"
              src="./public/images/icons/settings.svg"
              alt=""
            ></img>
          </div>
        </div>

  )

}