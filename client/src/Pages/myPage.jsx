import "./MyPage.css";
import React, { useState } from "react";
import UseProfileSection from "../components/mypage/UserProfileSection.jsx";
import UserPostGrid from "../components/mypage/UserPostGrid.jsx";
import { MyPageHeader } from "../components/mypage/MyPageHeader.jsx";
import { MyPageProfile } from "../components/mypage/MyPageProfile.jsx";

export default function MyPages() {
  // 설정 클릭시 프로필 설정/ 다시 클릭시 사용자 갤러리가 보임
  const [showPostGrid, setShowPostGrid] = useState(true);
  const handleProfileSetClick = () => {
    setShowPostGrid(!showPostGrid);
  };

  // 프로필 설정창에서 수정된 프로필 반영
  const [userCustomName, setUserCustomName] = useState("User0827");
  const handleUserCustomName = (newCustomName) => {
    setUserCustomName(newCustomName);
  };

  // 프로필 이미지 변경하기
  const [userProfileImage, setUserProfileImage] = useState("");
  const handleSaveProfileImage = (newImageUrl) => {
    setUserProfileImage(newImageUrl);
  };

  // 배경사진 변경하기
  const [userHederImage, setUserHederImage] = useState("");
  const handleSaveHederImage = (newHeaderImageUrl) => {
    setUserHederImage(newHeaderImageUrl);
  };

  return (
    <div>
      <div className="w-100 display-flex-column" style={{ height: "auto" }}>
        {/* 배경사진 */}
        <MyPageHeader userHederImage={userHederImage}/>

        {/* 프로필 사진, 이름, 설정 */}
        <MyPageProfile userProfileImage={userProfileImage}
                      userCustomName={userCustomName}
                      handleProfileSetClick={handleProfileSetClick}/>

        {/* 프로필 갤러리, 프로필 설정 변경 */}
        {showPostGrid ? (
          <UserPostGrid />
        ) : (
          <UseProfileSection
            // UserProfileSection에서 수정한 이름 반영
            userCustomName={userCustomName}
            onSaveUserName={handleUserCustomName}
            // UserProfileSection에서 수정한 프로필 사진 반영
            userProfileImage={userProfileImage}
            onSaveUserProfileImage={handleSaveProfileImage}
            // UserProfileSection에서 수정한 배경 사진 반영
            userHederImage={userHederImage}
            onSaverUserHeaderImage={handleSaveHederImage}
          />
        )}
      </div>
    </div>
  );
}
