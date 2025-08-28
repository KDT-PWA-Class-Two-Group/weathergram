import React from "react";

export function ProfileSet({handleProfileSetClick}){
  return (
    <div className="h-100px display-flex-center-end marginLeft-10px"
      onClick={handleProfileSetClick}>
            <img
              className="profile-set"
              src="./public/images/icons/settings.svg"
              alt=""
            ></img>
          </div>
  )
}