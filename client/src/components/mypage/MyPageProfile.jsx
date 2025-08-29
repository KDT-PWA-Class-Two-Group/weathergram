// MyPageProfile > ProfileImage, ProfileName, ProfileSet 3가지로 분리
import React from "react";
import '../../Pages/myPage.css'

import { ProfileImage } from "./profile-common/ProfileImage";
import { ProfileName } from "./profile-common/ProfileName";
import { ProfileSet } from "./profile-common/ProfileSet";


export function MyPageProfile({userProfileImage, userCustomName, handleProfileSetClick}){

  return(
    <div className="w-100 h-100px display-flex-alignItems-center marginTop--40px">
      {/* 프로필 이미지 */}
          <ProfileImage userProfileImage={userProfileImage}/>
          
        {/* 프로필 이름*/}
          <ProfileName userCustomName={userCustomName}/>

        {/* 프로필 셋팅 */}
         <ProfileSet handleProfileSetClick={handleProfileSetClick}/>
        </div>


  )

}