import React from "react";

export function ProfileName({userCustomName}){
  return (
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
  )
}